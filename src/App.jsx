import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import CourseDetailPage from './pages/CourseDetailPage';
import PracticalClassesPage from './pages/PracticalClassesPage';
import StudentLoginPage from './pages/StudentLoginPage';
import StudentRegisterPage from './pages/StudentRegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import StudentDashboardPage from './pages/StudentDashboardPage';
import StudentProfilePage from './pages/StudentProfilePage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminStudentDetailPage from './pages/AdminStudentDetailPage';
import MeetDeveloperPage from './pages/MeetDeveloperPage';
import ToolsLandingPage from './pages/ToolsLandingPage';
import ToolViewPage from './pages/ToolViewPage';
import SubmitAssignmentPage from './pages/SubmitAssignmentPage';
import NotFoundPage from './pages/NotFoundPage';

import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { CourseProvider } from './context/CourseContext';
import { ToastProvider } from './context/ToastContext';

function MainRouter() {
  const [currentPath, setCurrentPath] = useState(() => window.location.pathname || '/');
  const [searchParams, setSearchParams] = useState(() => new URLSearchParams(window.location.search));

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
      setSearchParams(new URLSearchParams(window.location.search));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path) => {
    let url = path;
    let newPath = path;
    let query = '';

    if (path.includes('?')) {
      const parts = path.split('?');
      newPath = parts[0];
      query = '?' + parts[1];
    }

    window.history.pushState(null, '', url);
    setCurrentPath(newPath);
    setSearchParams(new URLSearchParams(query));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderRoute = () => {
    // 1. Home
    if (currentPath === '/' || currentPath === '/home') {
      return <HomePage onNavigate={navigate} />;
    }

    // 2. Courses
    if (currentPath === '/courses') {
      return <CoursesPage onNavigate={navigate} />;
    }

    // 3. Course detail: /course/:slug
    if (currentPath.startsWith('/course/')) {
      const slug = currentPath.replace('/course/', '');
      return <CourseDetailPage slug={slug} onNavigate={navigate} />;
    }

    // 4. Practical Classes: /practical-classes or /student/practical-classes
    if (currentPath === '/practical-classes' || currentPath === '/student/practical-classes') {
      return <PracticalClassesPage onNavigate={navigate} searchParams={searchParams} />;
    }

    // 5. Auth
    if (currentPath === '/login') {
      return <StudentLoginPage onNavigate={navigate} />;
    }
    if (currentPath === '/register') {
      return <StudentRegisterPage onNavigate={navigate} />;
    }
    if (currentPath === '/forgot-password') {
      return <ForgotPasswordPage onNavigate={navigate} />;
    }
    if (currentPath === '/reset-password') {
      return <ResetPasswordPage onNavigate={navigate} />;
    }

    // 6. Student Dashboard & Profile
    if (currentPath === '/student/dashboard' || currentPath === '/dashboard') {
      return <StudentDashboardPage onNavigate={navigate} />;
    }
    if (currentPath === '/student/profile' || currentPath === '/profile') {
      return <StudentProfilePage onNavigate={navigate} />;
    }
    if (currentPath === '/submit-assignment') {
      return <SubmitAssignmentPage onNavigate={navigate} />;
    }

    // 7. Admin
    if (currentPath === '/admin/login') {
      return <AdminLoginPage onNavigate={navigate} />;
    }
    if (currentPath === '/admin/dashboard' || currentPath === '/admin') {
      return <AdminDashboardPage onNavigate={navigate} />;
    }
    if (currentPath.startsWith('/admin/student/')) {
      const studentId = currentPath.replace('/admin/student/', '');
      return <AdminStudentDetailPage studentId={studentId} onNavigate={navigate} />;
    }

    // 8. Meet Developer
    if (currentPath === '/meet-developer') {
      return <MeetDeveloperPage onNavigate={navigate} />;
    }

    // 9. Tools
    if (currentPath === '/tools') {
      return <ToolsLandingPage onNavigate={navigate} />;
    }
    if (currentPath.startsWith('/tools/')) {
      const toolId = currentPath.replace('/tools/', '');
      return <ToolViewPage toolId={toolId} onNavigate={navigate} />;
    }

    return <NotFoundPage onNavigate={navigate} />;
  };

  return (
    <div className="site-wrapper" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header currentPath={currentPath} onNavigate={navigate} />
      <main id="mainContent" style={{ flex: 1 }}>
        {renderRoute()}
      </main>
      <Footer onNavigate={navigate} />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CourseProvider>
          <ToastProvider>
            <MainRouter />
          </ToastProvider>
        </CourseProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
