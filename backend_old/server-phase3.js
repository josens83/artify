// Canva Clone - Backend Server
// Phase 3: 파일 업로드, 댓글, 버전 히스토리, 실시간 협업

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const PORT = 3001;
const JWT_SECRET = 'canva-clone-secret-key-change-in-production';

// Uploads 폴더 생성
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// Multer 설정 (파일 업로드)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadsDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB 제한
    fileFilter: function (req, file, cb) {
        const allowedTypes = /jpeg|jpg|png|gif|svg/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('이미지 파일만 업로드 가능합니다!'));
        }
    }
});

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use('/uploads', express.static(uploadsDir)); // 정적 파일 제공

// Database 초기화
const db = new sqlite3.Database('./canva-clone.db', (err) => {
    if (err) {
        console.error('Database connection error:', err);
    } else {
        console.log('✅ Connected to SQLite database');
        initializeDatabase();
    }
});

// 데이터베이스 테이블 생성
function initializeDatabase() {
    // Users 테이블
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            name TEXT NOT NULL,
            avatar TEXT,
            plan TEXT DEFAULT 'free',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `, (err) => {
        if (err) console.error('Error creating users table:', err);
        else console.log('✅ Users table ready');
    });

    // Projects 테이블
    db.run(`
        CREATE TABLE IF NOT EXISTS projects (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            title TEXT NOT NULL,
            thumbnail TEXT,
            canvas_data TEXT NOT NULL,
            canvas_width INTEGER DEFAULT 800,
            canvas_height INTEGER DEFAULT 1000,
            is_template INTEGER DEFAULT 0,
            folder_id INTEGER,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
    `, (err) => {
        if (err) console.error('Error creating projects table:', err);
        else console.log('✅ Projects table ready');
    });

    // Folders 테이블
    db.run(`
        CREATE TABLE IF NOT EXISTS folders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            name TEXT NOT NULL,
            parent_id INTEGER,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
    `, (err) => {
        if (err) console.error('Error creating folders table:', err);
        else console.log('✅ Folders table ready');
    });

    // Teams 테이블
    db.run(`
        CREATE TABLE IF NOT EXISTS teams (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            owner_id INTEGER NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (owner_id) REFERENCES users(id)
        )
    `, (err) => {
        if (err) console.error('Error creating teams table:', err);
        else console.log('✅ Teams table ready');
    });

    // Team Members 테이블
    db.run(`
        CREATE TABLE IF NOT EXISTS team_members (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            team_id INTEGER NOT NULL,
            user_id INTEGER NOT NULL,
            role TEXT DEFAULT 'member',
            joined_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (team_id) REFERENCES teams(id),
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
    `, (err) => {
        if (err) console.error('Error creating team_members table:', err);
        else console.log('✅ Team members table ready');
    });

    // Shared Projects 테이블
    db.run(`
        CREATE TABLE IF NOT EXISTS shared_projects (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            project_id INTEGER NOT NULL,
            shared_with_user_id INTEGER,
            shared_with_team_id INTEGER,
            permission TEXT DEFAULT 'view',
            shared_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (project_id) REFERENCES projects(id),
            FOREIGN KEY (shared_with_user_id) REFERENCES users(id),
            FOREIGN KEY (shared_with_team_id) REFERENCES teams(id)
        )
    `, (err) => {
        if (err) console.error('Error creating shared_projects table:', err);
        else console.log('✅ Shared projects table ready');
    });

    // ========== Phase 3: 새 테이블들 ==========

    // Comments 테이블 (댓글)
    db.run(`
        CREATE TABLE IF NOT EXISTS comments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            project_id INTEGER NOT NULL,
            user_id INTEGER NOT NULL,
            content TEXT NOT NULL,
            x INTEGER,
            y INTEGER,
            resolved INTEGER DEFAULT 0,
            parent_id INTEGER,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (project_id) REFERENCES projects(id),
            FOREIGN KEY (user_id) REFERENCES users(id),
            FOREIGN KEY (parent_id) REFERENCES comments(id)
        )
    `, (err) => {
        if (err) console.error('Error creating comments table:', err);
        else console.log('✅ Comments table ready');
    });

    // Project Versions 테이블 (버전 히스토리)
    db.run(`
        CREATE TABLE IF NOT EXISTS project_versions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            project_id INTEGER NOT NULL,
            version_number INTEGER NOT NULL,
            canvas_data TEXT NOT NULL,
            description TEXT,
            created_by INTEGER NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (project_id) REFERENCES projects(id),
            FOREIGN KEY (created_by) REFERENCES users(id)
        )
    `, (err) => {
        if (err) console.error('Error creating project_versions table:', err);
        else console.log('✅ Project versions table ready');
    });

    // Uploads 테이블 (업로드된 파일)
    db.run(`
        CREATE TABLE IF NOT EXISTS uploads (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            filename TEXT NOT NULL,
            original_name TEXT NOT NULL,
            file_path TEXT NOT NULL,
            file_size INTEGER NOT NULL,
            mime_type TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
    `, (err) => {
        if (err) console.error('Error creating uploads table:', err);
        else console.log('✅ Uploads table ready');
    });
}

// JWT 인증 미들웨어
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access token required' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token' });
        }
        req.user = user;
        next();
    });
};

// ==================== 기존 인증 라우트 ====================

// 회원가입
app.post('/api/auth/register', async (req, res) => {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        db.run(
            'INSERT INTO users (email, password, name) VALUES (?, ?, ?)',
            [email, hashedPassword, name],
            function(err) {
                if (err) {
                    if (err.message.includes('UNIQUE constraint failed')) {
                        return res.status(400).json({ error: 'Email already exists' });
                    }
                    return res.status(500).json({ error: 'Registration failed' });
                }

                const userId = this.lastID;
                const token = jwt.sign({ id: userId, email }, JWT_SECRET, { expiresIn: '7d' });

                res.status(201).json({
                    message: 'User registered successfully',
                    token,
                    user: { id: userId, email, name }
                });
            }
        );
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// 로그인
app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password required' });
    }

    db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
        if (err) {
            return res.status(500).json({ error: 'Server error' });
        }

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });

        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                avatar: user.avatar,
                plan: user.plan
            }
        });
    });
});

// 프로필 조회
app.get('/api/auth/profile', authenticateToken, (req, res) => {
    db.get('SELECT id, email, name, avatar, plan, created_at FROM users WHERE id = ?', 
        [req.user.id], 
        (err, user) => {
            if (err) {
                return res.status(500).json({ error: 'Server error' });
            }
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json(user);
        }
    );
});

// 프로필 업데이트
app.put('/api/auth/profile', authenticateToken, (req, res) => {
    const { name, avatar } = req.body;

    db.run(
        'UPDATE users SET name = ?, avatar = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        [name, avatar, req.user.id],
        function(err) {
            if (err) {
                return res.status(500).json({ error: 'Update failed' });
            }
            res.json({ message: 'Profile updated successfully' });
        }
    );
});

// ==================== 기존 프로젝트 라우트 ====================

// 프로젝트 목록 조회
app.get('/api/projects', authenticateToken, (req, res) => {
    const query = `
        SELECT p.*, u.name as owner_name
        FROM projects p
        JOIN users u ON p.user_id = u.id
        WHERE p.user_id = ?
        ORDER BY p.updated_at DESC
    `;

    db.all(query, [req.user.id], (err, projects) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch projects' });
        }
        
        // canvas_data를 JSON으로 파싱
        projects = projects.map(p => ({
            ...p,
            canvas_data: JSON.parse(p.canvas_data)
        }));
        
        res.json(projects);
    });
});

// 프로젝트 생성 (버전 히스토리 포함)
app.post('/api/projects', authenticateToken, (req, res) => {
    const { title, canvas_data, canvas_width, canvas_height, thumbnail, folder_id } = req.body;

    db.run(
        `INSERT INTO projects (user_id, title, canvas_data, canvas_width, canvas_height, thumbnail, folder_id) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [req.user.id, title, JSON.stringify(canvas_data || []), canvas_width, canvas_height, thumbnail, folder_id],
        function(err) {
            if (err) {
                return res.status(500).json({ error: 'Failed to create project' });
            }
            
            const projectId = this.lastID;
            
            // 첫 번째 버전 생성
            db.run(
                'INSERT INTO project_versions (project_id, version_number, canvas_data, description, created_by) VALUES (?, ?, ?, ?, ?)',
                [projectId, 1, JSON.stringify(canvas_data || []), 'Initial version', req.user.id],
                (err) => {
                    if (err) {
                        console.error('Failed to create initial version:', err);
                    }
                }
            );
            
            res.status(201).json({
                message: 'Project created successfully',
                project_id: projectId
            });
        }
    );
});

// 프로젝트 상세 조회
app.get('/api/projects/:id', authenticateToken, (req, res) => {
    db.get(
        'SELECT * FROM projects WHERE id = ? AND user_id = ?',
        [req.params.id, req.user.id],
        (err, project) => {
            if (err) {
                return res.status(500).json({ error: 'Server error' });
            }
            if (!project) {
                return res.status(404).json({ error: 'Project not found' });
            }
            
            project.canvas_data = JSON.parse(project.canvas_data);
            res.json(project);
        }
    );
});

// 프로젝트 업데이트 (버전 히스토리 자동 생성)
app.put('/api/projects/:id', authenticateToken, (req, res) => {
    const { title, canvas_data, canvas_width, canvas_height, thumbnail } = req.body;

    // 먼저 현재 버전 번호 확인
    db.get(
        'SELECT MAX(version_number) as max_version FROM project_versions WHERE project_id = ?',
        [req.params.id],
        (err, result) => {
            const nextVersion = (result && result.max_version ? result.max_version : 0) + 1;
            
            // 프로젝트 업데이트
            db.run(
                `UPDATE projects 
                 SET title = ?, canvas_data = ?, canvas_width = ?, canvas_height = ?, thumbnail = ?, updated_at = CURRENT_TIMESTAMP
                 WHERE id = ? AND user_id = ?`,
                [title, JSON.stringify(canvas_data), canvas_width, canvas_height, thumbnail, req.params.id, req.user.id],
                function(err) {
                    if (err) {
                        return res.status(500).json({ error: 'Failed to update project' });
                    }
                    if (this.changes === 0) {
                        return res.status(404).json({ error: 'Project not found' });
                    }
                    
                    // 새 버전 생성
                    db.run(
                        'INSERT INTO project_versions (project_id, version_number, canvas_data, description, created_by) VALUES (?, ?, ?, ?, ?)',
                        [req.params.id, nextVersion, JSON.stringify(canvas_data), 'Auto-saved version', req.user.id],
                        (err) => {
                            if (err) {
                                console.error('Failed to create version:', err);
                            }
                        }
                    );
                    
                    // WebSocket으로 다른 사용자에게 알림
                    io.to(`project-${req.params.id}`).emit('project-updated', {
                        projectId: req.params.id,
                        userId: req.user.id,
                        canvas_data: canvas_data
                    });
                    
                    res.json({ message: 'Project updated successfully' });
                }
            );
        }
    );
});

// 프로젝트 삭제
app.delete('/api/projects/:id', authenticateToken, (req, res) => {
    db.run(
        'DELETE FROM projects WHERE id = ? AND user_id = ?',
        [req.params.id, req.user.id],
        function(err) {
            if (err) {
                return res.status(500).json({ error: 'Failed to delete project' });
            }
            if (this.changes === 0) {
                return res.status(404).json({ error: 'Project not found' });
            }
            res.json({ message: 'Project deleted successfully' });
        }
    );
});

// ==================== Phase 3: 파일 업로드 ====================

// 파일 업로드
app.post('/api/upload', authenticateToken, upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const fileUrl = `/uploads/${req.file.filename}`;
    
    // 데이터베이스에 업로드 정보 저장
    db.run(
        'INSERT INTO uploads (user_id, filename, original_name, file_path, file_size, mime_type) VALUES (?, ?, ?, ?, ?, ?)',
        [req.user.id, req.file.filename, req.file.originalname, fileUrl, req.file.size, req.file.mimetype],
        function(err) {
            if (err) {
                return res.status(500).json({ error: 'Failed to save upload info' });
            }
            
            res.json({
                message: 'File uploaded successfully',
                file: {
                    id: this.lastID,
                    url: `http://localhost:${PORT}${fileUrl}`,
                    filename: req.file.filename,
                    originalName: req.file.originalname,
                    size: req.file.size,
                    mimeType: req.file.mimetype
                }
            });
        }
    );
});

// 내 업로드 목록
app.get('/api/uploads', authenticateToken, (req, res) => {
    db.all(
        'SELECT * FROM uploads WHERE user_id = ? ORDER BY created_at DESC',
        [req.user.id],
        (err, uploads) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to fetch uploads' });
            }
            
            // URL 전체 경로로 변환
            const uploadsWithUrls = uploads.map(upload => ({
                ...upload,
                url: `http://localhost:${PORT}${upload.file_path}`
            }));
            
            res.json(uploadsWithUrls);
        }
    );
});

// ==================== Phase 3: 댓글 시스템 ====================

// 댓글 목록
app.get('/api/projects/:id/comments', authenticateToken, (req, res) => {
    const query = `
        SELECT c.*, u.name as user_name, u.avatar as user_avatar
        FROM comments c
        JOIN users u ON c.user_id = u.id
        WHERE c.project_id = ?
        ORDER BY c.created_at ASC
    `;
    
    db.all(query, [req.params.id], (err, comments) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch comments' });
        }
        res.json(comments);
    });
});

// 댓글 추가
app.post('/api/projects/:id/comments', authenticateToken, (req, res) => {
    const { content, x, y, parent_id } = req.body;
    
    db.run(
        'INSERT INTO comments (project_id, user_id, content, x, y, parent_id) VALUES (?, ?, ?, ?, ?, ?)',
        [req.params.id, req.user.id, content, x, y, parent_id],
        function(err) {
            if (err) {
                return res.status(500).json({ error: 'Failed to create comment' });
            }
            
            // WebSocket으로 알림
            io.to(`project-${req.params.id}`).emit('new-comment', {
                id: this.lastID,
                project_id: req.params.id,
                user_id: req.user.id,
                content,
                x, y,
                created_at: new Date()
            });
            
            res.status(201).json({
                message: 'Comment created successfully',
                comment_id: this.lastID
            });
        }
    );
});

// 댓글 해결
app.put('/api/comments/:id/resolve', authenticateToken, (req, res) => {
    db.run(
        'UPDATE comments SET resolved = 1 WHERE id = ?',
        [req.params.id],
        function(err) {
            if (err) {
                return res.status(500).json({ error: 'Failed to resolve comment' });
            }
            res.json({ message: 'Comment resolved successfully' });
        }
    );
});

// 댓글 삭제
app.delete('/api/comments/:id', authenticateToken, (req, res) => {
    db.run(
        'DELETE FROM comments WHERE id = ? AND user_id = ?',
        [req.params.id, req.user.id],
        function(err) {
            if (err) {
                return res.status(500).json({ error: 'Failed to delete comment' });
            }
            res.json({ message: 'Comment deleted successfully' });
        }
    );
});

// ==================== Phase 3: 버전 히스토리 ====================

// 버전 목록
app.get('/api/projects/:id/versions', authenticateToken, (req, res) => {
    const query = `
        SELECT v.*, u.name as created_by_name
        FROM project_versions v
        JOIN users u ON v.created_by = u.id
        WHERE v.project_id = ?
        ORDER BY v.version_number DESC
    `;
    
    db.all(query, [req.params.id], (err, versions) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch versions' });
        }
        res.json(versions);
    });
});

// 특정 버전으로 복원
app.post('/api/projects/:id/restore/:versionId', authenticateToken, (req, res) => {
    // 버전 데이터 가져오기
    db.get(
        'SELECT * FROM project_versions WHERE id = ? AND project_id = ?',
        [req.params.versionId, req.params.id],
        (err, version) => {
            if (err || !version) {
                return res.status(404).json({ error: 'Version not found' });
            }
            
            // 프로젝트 업데이트
            db.run(
                'UPDATE projects SET canvas_data = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?',
                [version.canvas_data, req.params.id, req.user.id],
                function(err) {
                    if (err) {
                        return res.status(500).json({ error: 'Failed to restore version' });
                    }
                    
                    res.json({ 
                        message: 'Version restored successfully',
                        canvas_data: JSON.parse(version.canvas_data)
                    });
                }
            );
        }
    );
});

// ==================== 기존 라우트들 ====================

// 폴더 목록
app.get('/api/folders', authenticateToken, (req, res) => {
    db.all(
        'SELECT * FROM folders WHERE user_id = ? ORDER BY name',
        [req.user.id],
        (err, folders) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to fetch folders' });
            }
            res.json(folders);
        }
    );
});

// 폴더 생성
app.post('/api/folders', authenticateToken, (req, res) => {
    const { name, parent_id } = req.body;

    db.run(
        'INSERT INTO folders (user_id, name, parent_id) VALUES (?, ?, ?)',
        [req.user.id, name, parent_id],
        function(err) {
            if (err) {
                return res.status(500).json({ error: 'Failed to create folder' });
            }
            res.status(201).json({
                message: 'Folder created successfully',
                folder_id: this.lastID
            });
        }
    );
});

// 팀 생성
app.post('/api/teams', authenticateToken, (req, res) => {
    const { name } = req.body;

    db.run(
        'INSERT INTO teams (name, owner_id) VALUES (?, ?)',
        [name, req.user.id],
        function(err) {
            if (err) {
                return res.status(500).json({ error: 'Failed to create team' });
            }

            const teamId = this.lastID;
            
            db.run(
                'INSERT INTO team_members (team_id, user_id, role) VALUES (?, ?, ?)',
                [teamId, req.user.id, 'owner'],
                (err) => {
                    if (err) {
                        return res.status(500).json({ error: 'Failed to add owner to team' });
                    }
                    res.status(201).json({
                        message: 'Team created successfully',
                        team_id: teamId
                    });
                }
            );
        }
    );
});

// 내 팀 목록
app.get('/api/teams', authenticateToken, (req, res) => {
    const query = `
        SELECT t.*, u.name as owner_name
        FROM teams t
        JOIN users u ON t.owner_id = u.id
        JOIN team_members tm ON t.id = tm.team_id
        WHERE tm.user_id = ?
        ORDER BY t.created_at DESC
    `;

    db.all(query, [req.user.id], (err, teams) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch teams' });
        }
        res.json(teams);
    });
});

// 통계
app.get('/api/stats', authenticateToken, (req, res) => {
    const stats = {};

    db.get('SELECT COUNT(*) as count FROM projects WHERE user_id = ?', [req.user.id], (err, result) => {
        if (err) return res.status(500).json({ error: 'Server error' });
        stats.projects = result.count;

        db.get('SELECT COUNT(*) as count FROM folders WHERE user_id = ?', [req.user.id], (err, result) => {
            if (err) return res.status(500).json({ error: 'Server error' });
            stats.folders = result.count;

            db.get(
                'SELECT COUNT(*) as count FROM team_members WHERE user_id = ?',
                [req.user.id],
                (err, result) => {
                    if (err) return res.status(500).json({ error: 'Server error' });
                    stats.teams = result.count;

                    res.json(stats);
                }
            );
        });
    });
});

// 서버 상태 체크
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// ==================== Phase 3: WebSocket (실시간 협업) ====================

// 활성 사용자 추적
const activeUsers = new Map();

io.on('connection', (socket) => {
    console.log('✅ User connected:', socket.id);
    
    // 프로젝트 참여
    socket.on('join-project', ({ projectId, userId, userName }) => {
        socket.join(`project-${projectId}`);
        
        // 활성 사용자 추가
        if (!activeUsers.has(projectId)) {
            activeUsers.set(projectId, new Map());
        }
        activeUsers.get(projectId).set(userId, { userName, socketId: socket.id });
        
        // 다른 사용자들에게 알림
        socket.to(`project-${projectId}`).emit('user-joined', {
            userId,
            userName,
            activeUsers: Array.from(activeUsers.get(projectId).values())
        });
        
        // 현재 활성 사용자 목록 전송
        socket.emit('active-users', Array.from(activeUsers.get(projectId).values()));
        
        console.log(`User ${userName} joined project ${projectId}`);
    });
    
    // 프로젝트 나가기
    socket.on('leave-project', ({ projectId, userId }) => {
        socket.leave(`project-${projectId}`);
        
        if (activeUsers.has(projectId)) {
            activeUsers.get(projectId).delete(userId);
            
            // 다른 사용자들에게 알림
            socket.to(`project-${projectId}`).emit('user-left', {
                userId,
                activeUsers: Array.from(activeUsers.get(projectId).values())
            });
        }
    });
    
    // 커서 위치 업데이트
    socket.on('cursor-move', ({ projectId, userId, userName, x, y }) => {
        socket.to(`project-${projectId}`).emit('cursor-update', {
            userId,
            userName,
            x,
            y
        });
    });
    
    // 요소 선택
    socket.on('element-selected', ({ projectId, userId, userName, elementId }) => {
        socket.to(`project-${projectId}`).emit('element-locked', {
            userId,
            userName,
            elementId
        });
    });
    
    // 요소 해제
    socket.on('element-deselected', ({ projectId, elementId }) => {
        socket.to(`project-${projectId}`).emit('element-unlocked', {
            elementId
        });
    });
    
    // 실시간 편집
    socket.on('canvas-update', ({ projectId, userId, elements }) => {
        socket.to(`project-${projectId}`).emit('canvas-changed', {
            userId,
            elements
        });
    });
    
    // 연결 해제
    socket.on('disconnect', () => {
        console.log('❌ User disconnected:', socket.id);
        
        // 모든 프로젝트에서 사용자 제거
        activeUsers.forEach((users, projectId) => {
            users.forEach((userData, userId) => {
                if (userData.socketId === socket.id) {
                    users.delete(userId);
                    
                    io.to(`project-${projectId}`).emit('user-left', {
                        userId,
                        activeUsers: Array.from(users.values())
                    });
                }
            });
        });
    });
});

// 서버 시작
server.listen(PORT, () => {
    console.log(`
    ╔════════════════════════════════════════╗
    ║  🚀 Canva Clone Backend Server        ║
    ║  📍 http://localhost:${PORT}             ║
    ║  ✅ Phase 3: Full Features Ready      ║
    ║  📁 File Upload                       ║
    ║  💬 Comments System                   ║
    ║  📜 Version History                   ║
    ║  🤝 Real-time Collaboration           ║
    ╚════════════════════════════════════════╝
    `);
});

// Graceful shutdown
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error('Error closing database:', err);
        } else {
            console.log('\n✅ Database connection closed');
        }
        process.exit(0);
    });
});