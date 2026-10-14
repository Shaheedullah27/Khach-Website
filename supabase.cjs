const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const isConfigured = Boolean(
  supabaseUrl &&
  typeof supabaseUrl === 'string' &&
  /^https?:\/\//i.test(supabaseUrl) &&
  supabaseAnonKey
);

let supabase = null;
let supabaseAdmin = null;
let hasServiceRoleKey = false;

if (isConfigured) {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      }
    });

    supabaseAdmin = supabaseServiceRoleKey
      ? createClient(supabaseUrl, supabaseServiceRoleKey, {
          auth: {
            persistSession: false,
            autoRefreshToken: false
          }
        })
      : null;

    hasServiceRoleKey = Boolean(supabaseServiceRoleKey);
  } catch (err) {
    console.warn('[AI Studio] Failed to initialize real Supabase client, falling back to mock:', err.message);
  }
}

if (!supabase) {
  console.warn('[AI Studio] SUPABASE_URL / SUPABASE_ANON_KEY not configured or invalid. Initializing in-memory database mock.');

  const tables = {
    users: [
      {
        id: 'admin-seed-id',
        role: 'admin',
        full_name: 'Ahmad Saleem',
        email: 'ahmadsaleem298gb@gmail.com',
        cnic: '35201-1234567-1',
        whatsapp_number: '+923327451571',
        created_at: new Date().toISOString()
      },
      {
        id: 'student-seed-id',
        role: 'student',
        full_name: 'Demo Student',
        email: 'student@example.com',
        cnic: '35201-7654321-1',
        whatsapp_number: '+923001234567',
        created_at: new Date().toISOString()
      }
    ],
    courses: [
      {
        id: 1,
        title: 'Advanced Artificial Intelligence',
        description: 'Comprehensive hands-on mentorship covering LLMs, automation, and real-world AI applications.',
        thumbnail_url: '/images/thumb-ai.jpeg',
        status: 'published',
        display_order: 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 2,
        title: 'Graphic Designing',
        description: 'Practical design track focusing on high-impact marketing assets, social media kits, and Canva branding.',
        thumbnail_url: '/images/thumb-graphics.jpeg',
        status: 'published',
        display_order: 2,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 3,
        title: 'YouTube Automation',
        description: 'End-to-end channel creation, content strategy, video production workflows, and monetization.',
        thumbnail_url: '/images/thumb-yt.jpeg',
        status: 'published',
        display_order: 3,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 4,
        title: 'Web Development',
        description: 'Build dynamic, client-ready websites, ecommerce stores, and custom WordPress landing pages.',
        thumbnail_url: '/images/thumb-webdev.jpeg',
        status: 'published',
        display_order: 4,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ],
    questions: [
      {
        id: 1,
        course_id: 1,
        question_number: 1,
        question_text: 'Introduction to Prompt Engineering & Modern AI Models',
        description: 'Watch the reference video and master zero-shot and few-shot prompting techniques.',
        youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        response_type: 'short_answer',
        display_order: 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 2,
        course_id: 1,
        question_number: 2,
        question_text: 'Text-to-Image & Image-to-Video Workflow Demonstration',
        description: 'Generate high-resolution creative assets and export video clips using AI generators.',
        youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        response_type: 'short_answer',
        display_order: 2,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 3,
        course_id: 2,
        question_number: 1,
        question_text: 'Designing a Cohesive Brand Kit & Social Kit in Canva',
        description: 'Define your typography, color palette, and multi-format templates.',
        youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        response_type: 'short_answer',
        display_order: 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 4,
        course_id: 3,
        question_number: 1,
        question_text: 'Profitable Niche Identification and Faceless Channel Architecture',
        description: 'Research high-RPM niches and set up channel branding and uploading pipelines.',
        youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        response_type: 'short_answer',
        display_order: 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 5,
        course_id: 4,
        question_number: 1,
        question_text: 'WordPress Architecture, Core Setup and Page Builder Foundations',
        description: 'Install WordPress, configure responsive layouts, and set up your initial landing page.',
        youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        response_type: 'short_answer',
        display_order: 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ],
    student_enrollments: [
      {
        id: 1,
        student_id: 'student-seed-id',
        course_id: 1,
        enrolled_at: new Date().toISOString(),
        assignment_timer_started_at: null
      }
    ],
    question_progress: [],
    assignment_submissions: [],
    course_progress: []
  };

  let idCounter = 1000;

  class MockQueryBuilder {
    constructor(tableName) {
      this.tableName = tableName;
      this.filters = [];
      this.orders = [];
      this.limitCount = null;
      this.selectedColumns = '*';
      this.headOnly = false;
      this.countExact = false;
      this.action = 'select';
      this.payload = null;
      this.upsertOptions = null;
    }

    _getTable() {
      if (!tables[this.tableName]) {
        tables[this.tableName] = [];
      }
      return tables[this.tableName];
    }

    select(columns = '*', options = {}) {
      this.selectedColumns = columns;
      if (options.head) this.headOnly = true;
      if (options.count === 'exact') this.countExact = true;
      return this;
    }

    eq(column, value) {
      this.filters.push((row) => String(row[column]) === String(value));
      return this;
    }

    neq(column, value) {
      this.filters.push((row) => String(row[column]) !== String(value));
      return this;
    }

    in(column, values) {
      const set = new Set((values || []).map(String));
      this.filters.push((row) => set.has(String(row[column])));
      return this;
    }

    order(column, { ascending = true } = {}) {
      this.orders.push({ column, ascending });
      return this;
    }

    limit(count) {
      this.limitCount = count;
      return this;
    }

    insert(data) {
      this.action = 'insert';
      this.payload = Array.isArray(data) ? data : [data];
      return this;
    }

    update(updates) {
      this.action = 'update';
      this.payload = updates;
      return this;
    }

    upsert(data, options = {}) {
      this.action = 'upsert';
      this.payload = Array.isArray(data) ? data : [data];
      this.upsertOptions = options;
      return this;
    }

    delete() {
      this.action = 'delete';
      return this;
    }

    _execute() {
      const table = this._getTable();

      if (this.action === 'insert') {
        const created = this.payload.map((item) => {
          const row = {
            id: item.id !== undefined ? item.id : ++idCounter,
            created_at: new Date().toISOString(),
            ...item
          };
          table.push(row);
          return row;
        });
        return { data: this.payload.length === 1 ? created[0] : created, error: null };
      }

      if (this.action === 'upsert') {
        const onConflictCols = (this.upsertOptions && this.upsertOptions.onConflict)
          ? this.upsertOptions.onConflict.split(',').map((s) => s.trim())
          : ['id'];

        const upserted = this.payload.map((item) => {
          const idx = table.findIndex((row) =>
            onConflictCols.every((col) => String(row[col]) === String(item[col]))
          );
          if (idx >= 0) {
            table[idx] = { ...table[idx], ...item, updated_at: new Date().toISOString() };
            return table[idx];
          } else {
            const row = {
              id: item.id !== undefined ? item.id : ++idCounter,
              created_at: new Date().toISOString(),
              ...item
            };
            table.push(row);
            return row;
          }
        });
        return { data: this.payload.length === 1 ? upserted[0] : upserted, error: null };
      }

      if (this.action === 'update') {
        let lastUpdated = null;
        for (let i = 0; i < table.length; i++) {
          if (this.filters.every((fn) => fn(table[i]))) {
            table[i] = { ...table[i], ...this.payload, updated_at: new Date().toISOString() };
            lastUpdated = table[i];
          }
        }
        return { data: lastUpdated, error: null };
      }

      if (this.action === 'delete') {
        const remaining = table.filter((row) => !this.filters.every((fn) => fn(row)));
        tables[this.tableName] = remaining;
        return { data: [], error: null };
      }

      // Action: select
      let rows = table.filter((row) => this.filters.every((fn) => fn(row)));

      for (const { column, ascending } of this.orders) {
        rows.sort((a, b) => {
          const valA = a[column];
          const valB = b[column];
          if (valA === valB) return 0;
          if (valA == null) return 1;
          if (valB == null) return -1;
          return ascending ? (valA > valB ? 1 : -1) : (valA < valB ? 1 : -1);
        });
      }

      const totalCount = rows.length;

      if (this.limitCount !== null) {
        rows = rows.slice(0, this.limitCount);
      }

      if (this.headOnly) {
        return { count: totalCount, data: null, error: null };
      }

      const res = { data: rows.map((r) => ({ ...r })), error: null };
      if (this.countExact) {
        res.count = totalCount;
      }
      return res;
    }

    async single() {
      const result = this._execute();
      if (result.error) return result;
      if (Array.isArray(result.data)) {
        if (result.data.length === 0) {
          return { data: null, error: { message: 'Row not found', code: 'PGRST116' } };
        }
        return { data: result.data[0], error: null };
      }
      return result;
    }

    async maybeSingle() {
      const result = this._execute();
      if (result.error) return result;
      if (Array.isArray(result.data)) {
        return { data: result.data[0] || null, error: null };
      }
      return result;
    }

    then(resolve, reject) {
      try {
        const result = this._execute();
        resolve(result);
      } catch (err) {
        reject(err);
      }
    }
  }

  const mockClient = {
    from(tableName) {
      return new MockQueryBuilder(tableName);
    },
    auth: {
      async signUp({ email, password, options = {} }) {
        const trimmed = String(email || '').trim().toLowerCase();
        const existing = tables.users.find((u) => u.email.toLowerCase() === trimmed);
        if (existing) {
          return { data: { user: null }, error: { message: 'User already registered' } };
        }
        const user = {
          id: 'usr-' + (++idCounter),
          email: trimmed,
          role: (options.data && options.data.role) || 'student'
        };
        return { data: { user }, error: null };
      },
      async signInWithPassword({ email, password }) {
        const trimmed = String(email || '').trim().toLowerCase();
        const user = tables.users.find((u) => u.email.toLowerCase() === trimmed);
        if (!user) {
          return { data: { user: null }, error: { message: 'Invalid email or password.' } };
        }
        return { data: { user: { id: user.id, email: user.email } }, error: null };
      },
      admin: {
        async deleteUser(userId) {
          tables.users = tables.users.filter((u) => u.id !== userId);
          return { data: {}, error: null };
        }
      }
    }
  };

  supabase = mockClient;
  supabaseAdmin = mockClient;
  hasServiceRoleKey = true;
}

module.exports = Object.assign(supabase, {
  supabaseAdmin,
  admin: supabaseAdmin,
  hasServiceRoleKey
});