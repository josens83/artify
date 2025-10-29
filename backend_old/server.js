const express = require('express');
const http = require('http');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const CollaborationServer = require('./websocket');

const app = express();
const server = http.createServer(app);
const PORT = 3001;
const JWT_SECRET = 'your-secret-key-change-this-in-production';

// WebSocket 서버 초기화
const collaborationServer = new CollaborationServer(server);

// 미들웨어
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use('/uploads', express.static('uploads'));

// uploads 디렉토리 생성
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

// Multer 설정
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// 데이터베이스 초기화
const db = new sqlite3.Database('./canva-clone.db', (err) => {
    if (err) {
        console.error('Database connection error:', err);
    } else {
        console.log('Connected to SQLite database');
        initDatabase();
    }
});

// Promise 기반 DB 쿼리
const dbRun = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        db.run(sql, params, function(err) {
            if (err) reject(err);
            else resolve({ lastID: this.lastID, changes: this.changes });
        });
    });
};

const dbGet = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        db.get(sql, params, (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });
};

const dbAll = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
};

// 데이터베이스 테이블 생성
async function initDatabase() {
    try {
        await dbRun(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                name TEXT NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

        await dbRun(`
            CREATE TABLE IF NOT EXISTS projects (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                user_id INTEGER NOT NULL,
                canvas_width INTEGER DEFAULT 800,
                canvas_height INTEGER DEFAULT 1000,
                canvas_data TEXT DEFAULT '[]',
                thumbnail TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id)
            )
        `);

        await dbRun(`
            CREATE TABLE IF NOT EXISTS project_versions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                project_id INTEGER NOT NULL,
                version_number INTEGER NOT NULL,
                canvas_data TEXT NOT NULL,
                created_by INTEGER NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (project_id) REFERENCES projects(id),
                FOREIGN KEY (created_by) REFERENCES users(id)
            )
        `);

        await dbRun(`
            CREATE TABLE IF NOT EXISTS comments (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                project_id INTEGER NOT NULL,
                user_id INTEGER NOT NULL,
                content TEXT NOT NULL,
                x INTEGER,
                y INTEGER,
                resolved BOOLEAN DEFAULT 0,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (project_id) REFERENCES projects(id),
                FOREIGN KEY (user_id) REFERENCES users(id)
            )
        `);

        await dbRun(`
            CREATE TABLE IF NOT EXISTS uploads (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                filename TEXT NOT NULL,
                filepath TEXT NOT NULL,
                url TEXT NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id)
            )
        `);

        await dbRun(`
            CREATE TABLE IF NOT EXISTS teams (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                created_by INTEGER NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (created_by) REFERENCES users(id)
            )
        `);

        await dbRun(`
            CREATE TABLE IF NOT EXISTS team_members (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                team_id INTEGER NOT NULL,
                user_id INTEGER NOT NULL,
                role TEXT DEFAULT 'member',
                joined_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (team_id) REFERENCES teams(id),
                FOREIGN KEY (user_id) REFERENCES users(id)
            )
        `);

        await dbRun(`
            CREATE TABLE IF NOT EXISTS shared_projects (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                project_id INTEGER NOT NULL,
                user_id INTEGER,
                team_id INTEGER,
                permission TEXT DEFAULT 'view',
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (project_id) REFERENCES projects(id),
                FOREIGN KEY (user_id) REFERENCES users(id),
                FOREIGN KEY (team_id) REFERENCES teams(id)
            )
        `);

        console.log('Database tables initialized');
    } catch (err) {
        console.error('Database initialization error:', err);
    }
}

// JWT 인증 미들웨어
function authenticateToken(req, res, next) {
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
}

// ==================== AUTH ROUTES ====================

app.post('/api/auth/register', async (req, res) => {
    try {
        const { email, password, name } = req.body;

        const existing = await dbGet('SELECT id FROM users WHERE email = ?', [email]);
        if (existing) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await dbRun(
            'INSERT INTO users (email, password, name) VALUES (?, ?, ?)',
            [email, hashedPassword, name]
        );

        const token = jwt.sign(
            { userId: result.lastID, email, name },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            token,
            user: { id: result.lastID, email, name }
        });
    } catch (err) {
        console.error('Register error:', err);
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await dbGet('SELECT * FROM users WHERE email = ?', [email]);
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { userId: user.id, email: user.email, name: user.name },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            token,
            user: { id: user.id, email: user.email, name: user.name }
        });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: err.message });
    }
});

// ==================== PROJECT ROUTES ====================

app.get('/api/projects', authenticateToken, async (req, res) => {
    try {
        const projects = await dbAll(
            'SELECT * FROM projects WHERE user_id = ? ORDER BY updated_at DESC',
            [req.user.userId]
        );

        const parsedProjects = projects.map(p => ({
            ...p,
            canvas_data: JSON.parse(p.canvas_data || '[]')
        }));

        res.json(parsedProjects);
    } catch (err) {
        console.error('Get projects error:', err);
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/projects', authenticateToken, async (req, res) => {
    try {
        const { title, canvas_width = 800, canvas_height = 1000 } = req.body;

        const result = await dbRun(
            `INSERT INTO projects (title, user_id, canvas_width, canvas_height, canvas_data, created_at, updated_at)
             VALUES (?, ?, ?, ?, ?, datetime('now'), datetime('now'))`,
            [title, req.user.userId, canvas_width, canvas_height, JSON.stringify([])]
        );

        const project = await dbGet('SELECT * FROM projects WHERE id = ?', [result.lastID]);

        await dbRun(
            `INSERT INTO project_versions (project_id, version_number, canvas_data, created_by)
             VALUES (?, 1, ?, ?)`,
            [result.lastID, JSON.stringify([]), req.user.userId]
        );

        res.json({
            success: true,
            id: result.lastID,
            project: {
                ...project,
                canvas_data: JSON.parse(project.canvas_data || '[]')
            }
        });
    } catch (err) {
        console.error('Create project error:', err);
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/projects/:id', authenticateToken, async (req, res) => {
    try {
        const project = await dbGet(
            'SELECT * FROM projects WHERE id = ? AND user_id = ?',
            [req.params.id, req.user.userId]
        );

        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        res.json({
            ...project,
            canvas_data: JSON.parse(project.canvas_data || '[]')
        });
    } catch (err) {
        console.error('Get project error:', err);
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/projects/:id', authenticateToken, async (req, res) => {
    try {
        const { title, canvas_data, canvas_width, canvas_height, thumbnail } = req.body;

        const project = await dbGet(
            'SELECT * FROM projects WHERE id = ? AND user_id = ?',
            [req.params.id, req.user.userId]
        );

        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        await dbRun(
            `UPDATE projects 
             SET title = ?, canvas_data = ?, canvas_width = ?, canvas_height = ?, 
                 thumbnail = ?, updated_at = datetime('now')
             WHERE id = ?`,
            [
                title || project.title,
                JSON.stringify(canvas_data || []),
                canvas_width || project.canvas_width,
                canvas_height || project.canvas_height,
                thumbnail || project.thumbnail,
                req.params.id
            ]
        );

        const lastVersion = await dbGet(
            'SELECT version_number FROM project_versions WHERE project_id = ? ORDER BY version_number DESC LIMIT 1',
            [req.params.id]
        );

        const nextVersion = (lastVersion?.version_number || 0) + 1;

        await dbRun(
            `INSERT INTO project_versions (project_id, version_number, canvas_data, created_by)
             VALUES (?, ?, ?, ?)`,
            [req.params.id, nextVersion, JSON.stringify(canvas_data || []), req.user.userId]
        );

        res.json({ success: true });
    } catch (err) {
        console.error('Update project error:', err);
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/projects/:id', authenticateToken, async (req, res) => {
    try {
        const project = await dbGet(
            'SELECT * FROM projects WHERE id = ? AND user_id = ?',
            [req.params.id, req.user.userId]
        );

        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        await dbRun('DELETE FROM projects WHERE id = ?', [req.params.id]);
        await dbRun('DELETE FROM project_versions WHERE project_id = ?', [req.params.id]);
        await dbRun('DELETE FROM comments WHERE project_id = ?', [req.params.id]);

        res.json({ success: true });
    } catch (err) {
        console.error('Delete project error:', err);
        res.status(500).json({ error: err.message });
    }
});

// ==================== VERSION ROUTES ====================

app.get('/api/projects/:id/versions', authenticateToken, async (req, res) => {
    try {
        const versions = await dbAll(
            `SELECT pv.*, u.name as created_by_name
             FROM project_versions pv
             JOIN users u ON pv.created_by = u.id
             WHERE pv.project_id = ?
             ORDER BY pv.version_number DESC`,
            [req.params.id]
        );

        res.json(versions);
    } catch (err) {
        console.error('Get versions error:', err);
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/projects/:projectId/restore/:versionId', authenticateToken, async (req, res) => {
    try {
        const version = await dbGet(
            'SELECT * FROM project_versions WHERE id = ? AND project_id = ?',
            [req.params.versionId, req.params.projectId]
        );

        if (!version) {
            return res.status(404).json({ error: 'Version not found' });
        }

        await dbRun(
            `UPDATE projects SET canvas_data = ?, updated_at = datetime('now') WHERE id = ?`,
            [version.canvas_data, req.params.projectId]
        );

        res.json({
            success: true,
            canvas_data: JSON.parse(version.canvas_data)
        });
    } catch (err) {
        console.error('Restore version error:', err);
        res.status(500).json({ error: err.message });
    }
});

// ==================== UPLOAD ROUTES ====================

app.post('/api/upload', authenticateToken, upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const url = `http://localhost:${PORT}/uploads/${req.file.filename}`;

        const result = await dbRun(
            `INSERT INTO uploads (user_id, filename, filepath, url) VALUES (?, ?, ?, ?)`,
            [req.user.userId, req.file.originalname, req.file.path, url]
        );

        res.json({
            success: true,
            file: {
                id: result.lastID,
                filename: req.file.originalname,
                url
            }
        });
    } catch (err) {
        console.error('Upload error:', err);
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/uploads', authenticateToken, async (req, res) => {
    try {
        const uploads = await dbAll(
            'SELECT * FROM uploads WHERE user_id = ? ORDER BY created_at DESC',
            [req.user.userId]
        );

        res.json(uploads);
    } catch (err) {
        console.error('Get uploads error:', err);
        res.status(500).json({ error: err.message });
    }
});

// ==================== COMMENT ROUTES ====================

app.get('/api/projects/:id/comments', authenticateToken, async (req, res) => {
    try {
        const comments = await dbAll(
            `SELECT c.*, u.name as user_name
             FROM comments c
             JOIN users u ON c.user_id = u.id
             WHERE c.project_id = ?
             ORDER BY c.created_at DESC`,
            [req.params.id]
        );

        res.json(comments);
    } catch (err) {
        console.error('Get comments error:', err);
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/projects/:id/comments', authenticateToken, async (req, res) => {
    try {
        const { content, x, y } = req.body;

        const result = await dbRun(
            `INSERT INTO comments (project_id, user_id, content, x, y) VALUES (?, ?, ?, ?, ?)`,
            [req.params.id, req.user.userId, content, x, y]
        );

        const comment = await dbGet(
            `SELECT c.*, u.name as user_name
             FROM comments c
             JOIN users u ON c.user_id = u.id
             WHERE c.id = ?`,
            [result.lastID]
        );

        res.json(comment);
    } catch (err) {
        console.error('Add comment error:', err);
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/comments/:id/resolve', authenticateToken, async (req, res) => {
    try {
        await dbRun('UPDATE comments SET resolved = 1 WHERE id = ?', [req.params.id]);
        res.json({ success: true });
    } catch (err) {
        console.error('Resolve comment error:', err);
        res.status(500).json({ error: err.message });
    }
});

// ==================== TEAM ROUTES ====================

app.post('/api/teams', authenticateToken, async (req, res) => {
    try {
        const { name } = req.body;

        const result = await dbRun(
            'INSERT INTO teams (name, created_by) VALUES (?, ?)',
            [name, req.user.userId]
        );

        await dbRun(
            `INSERT INTO team_members (team_id, user_id, role) VALUES (?, ?, 'owner')`,
            [result.lastID, req.user.userId]
        );

        res.json({ success: true, id: result.lastID });
    } catch (err) {
        console.error('Create team error:', err);
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/teams', authenticateToken, async (req, res) => {
    try {
        const teams = await dbAll(
            `SELECT t.*, tm.role
             FROM teams t
             JOIN team_members tm ON t.id = tm.team_id
             WHERE tm.user_id = ?
             ORDER BY t.created_at DESC`,
            [req.user.userId]
        );

        res.json(teams);
    } catch (err) {
        console.error('Get teams error:', err);
        res.status(500).json({ error: err.message });
    }
});

// 서버 시작
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`WebSocket server running on ws://localhost:${PORT}`);
});