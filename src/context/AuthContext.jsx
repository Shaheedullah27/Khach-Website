import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const DEFAULT_USERS = [
  {
    id: 'admin-1',
    role: 'admin',
    fullName: 'Ahmad Saleem',
    email: 'ahmadsaleem298gb@gmail.com',
    password: 'Password123'
  },
  {
    id: 'student-1',
    role: 'student',
    fullName: 'Demo Student',
    email: 'student@example.com',
    password: 'Password123',
    cnic: '35201-1234567-1',
    whatsapp: '+923001234567',
    enrolledCourses: ['c1', 'c2', 'c3', 'c4']
  }
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('as_auth_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [usersList, setUsersList] = useState(() => {
    try {
      const stored = localStorage.getItem('as_users_list');
      return stored ? JSON.parse(stored) : DEFAULT_USERS;
    } catch {
      return DEFAULT_USERS;
    }
  });

  useEffect(() => {
    localStorage.setItem('as_users_list', JSON.stringify(usersList));
  }, [usersList]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('as_auth_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('as_auth_user');
    }
  }, [user]);

  const login = async (email, password, requiredRole = null) => {
    const trimmedEmail = String(email || '').trim().toLowerCase();
    const found = usersList.find(u => u.email.toLowerCase() === trimmedEmail);

    if (!found) {
      // Allow demo admin login easily
      if (trimmedEmail === 'ahmadsaleem298gb@gmail.com') {
        const adminUser = {
          id: 'admin-1',
          role: 'admin',
          fullName: 'Ahmad Saleem',
          email: trimmedEmail
        };
        setUser(adminUser);
        return { success: true, user: adminUser };
      }
      throw new Error('Invalid email or password.');
    }

    if (requiredRole && found.role !== requiredRole) {
      throw new Error(`This account does not have access to the ${requiredRole} portal.`);
    }

    const sessionUser = {
      id: found.id,
      role: found.role,
      fullName: found.fullName,
      email: found.email,
      cnic: found.cnic,
      whatsapp: found.whatsapp,
      enrolledCourses: found.enrolledCourses || ['c1']
    };

    setUser(sessionUser);
    return { success: true, user: sessionUser };
  };

  const register = async ({ fullName, cnic, whatsappNumber, email, password, courseId }) => {
    const trimmedEmail = String(email || '').trim().toLowerCase();
    const existing = usersList.find(u => u.email.toLowerCase() === trimmedEmail);
    if (existing) {
      throw new Error('An account with this email already exists.');
    }

    const newUser = {
      id: 'student-' + Date.now(),
      role: 'student',
      fullName: String(fullName || '').trim(),
      cnic: String(cnic || '').trim(),
      whatsapp: String(whatsappNumber || '').trim(),
      email: trimmedEmail,
      password: password,
      enrolledCourses: courseId ? [courseId] : ['c1'],
      createdAt: new Date().toISOString()
    };

    setUsersList(prev => [...prev, newUser]);
    const sessionUser = {
      id: newUser.id,
      role: newUser.role,
      fullName: newUser.fullName,
      email: newUser.email,
      cnic: newUser.cnic,
      whatsapp: newUser.whatsapp,
      enrolledCourses: newUser.enrolledCourses
    };

    setUser(sessionUser);
    return { success: true, user: sessionUser };
  };

  const logout = () => {
    setUser(null);
  };

  const enrollInCourse = (courseId) => {
    if (!user) return;
    const currentCourses = user.enrolledCourses || [];
    if (!currentCourses.includes(courseId)) {
      const updated = { ...user, enrolledCourses: [...currentCourses, courseId] };
      setUser(updated);
      setUsersList(prev => prev.map(u => u.id === user.id ? { ...u, enrolledCourses: updated.enrolledCourses } : u));
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      enrollInCourse,
      usersList,
      isAuthenticated: Boolean(user),
      isAdmin: user?.role === 'admin',
      isStudent: user?.role === 'student'
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
