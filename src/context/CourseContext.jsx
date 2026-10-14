import React, { createContext, useContext, useState, useEffect } from 'react';

const CourseContext = createContext();

export const INITIAL_COURSES = [
  {
    id: 'c1',
    slug: 'youtube-automation',
    title: 'YouTube Automation',
    description: 'Master YouTube channel growth, automation tools, and content strategy.',
    badge: 'Advanced',
    duration: '2 Months',
    level: 'Advanced',
    image: '/images/yt.png',
    thumb: '/images/thumb-yt.jpeg',
    page: 'course-youtube-automation.html',
    topics: ['Niche research', 'Channel automation', 'YouTube SEO'],
    playlist: 'https://youtube.com/playlist?list=PLfwp9CvuUprE&si=PQzJ7KfoQkhiD6xm',
    highlights: ['Niche and content research', 'Channel automation workflows', 'YouTube SEO and analytics'],
    magic: 'Turn a simple idea into a repeatable content engine that can grow while you focus on the creative direction.',
    tools: 'YouTube Studio, content planning tools, thumbnail workflows, and automation systems',
    bestFor: 'Creators, entrepreneurs, and anyone who wants to build a channel with a clear strategy.',
    questions: [
      {
        id: 'q101',
        number: 1,
        title: 'Niche Identification & Competitor Channel Breakdown',
        description: 'Conduct comprehensive analysis on 3 profitable faceless niches and identify high RPM content categories.',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
      },
      {
        id: 'q102',
        number: 2,
        title: 'Scriptwriting Automation & Voiceover Synthesis',
        description: 'Set up your AI writing workflow and produce an engaging 8-minute documentary script.',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
      },
      {
        id: 'q103',
        number: 3,
        title: 'High-CTR Thumbnail Design and Visual Hierarchy',
        description: 'Design 3 click-worthy thumbnail concepts using composition rules and emotional hooks.',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
      },
      {
        id: 'q104',
        number: 4,
        title: 'Video SEO, Tagging Strategy & Upload Scheduling',
        description: 'Optimize metadata, descriptions, cards, end screens, and batch-render automation queues.',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
      }
    ]
  },
  {
    id: 'c2',
    slug: 'canva',
    title: 'Graphic Designing through Canva',
    description: 'Create stunning graphics with Canva for social media, branding and more.',
    badge: 'Advanced',
    duration: '2 Months',
    level: 'Advanced',
    image: '/images/canva.png',
    thumb: '/images/thumb-graphics.jpeg',
    page: 'course-canva.html',
    topics: ['Design fundamentals', 'Brand kits', 'Social graphics'],
    playlist: 'https://youtube.com/playlist?list=PLEUsuq8UIsYA&si=Qs0RNbVoQD7Kdng4',
    highlights: ['Design fundamentals and composition', 'Canva tools and brand kits', 'Social media graphics and exports'],
    magic: 'Make polished visuals feel effortless by turning your ideas into designs that look consistent, clear, and ready to share.',
    tools: 'Canva, brand kits, templates, social media layouts, and visual content systems',
    bestFor: 'Beginners, small businesses, content creators, and anyone who wants stronger visual communication.',
    questions: [
      {
        id: 'q201',
        number: 1,
        title: 'Visual Hierarchy, Typography Pairs & Color Systems',
        description: 'Build a cohesive brand board with primary, secondary, and accent colors, font hierarchy, and logo placement.',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
      },
      {
        id: 'q202',
        number: 2,
        title: 'Multi-Format Social Media Kit Creation',
        description: 'Produce matching Instagram carousels, Facebook banners, and story graphics from a single template base.',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
      },
      {
        id: 'q203',
        number: 3,
        title: 'Print-Ready Marketing Materials & Vector Exports',
        description: 'Configure bleed, margins, CMYK print readiness, and export high-resolution flyers and business cards.',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
      }
    ]
  },
  {
    id: 'c3',
    slug: 'wordpress',
    title: 'Web Development through WordPress',
    description: 'Build professional websites without coding using WordPress.',
    badge: 'Advanced',
    duration: '2 Months',
    level: 'Advanced',
    image: '/images/wp.png',
    thumb: '/images/thumb-webdev.jpeg',
    page: 'course-wordpress.html',
    topics: ['Themes & plugins', 'Elementor builds', 'SEO basics'],
    playlist: 'https://youtube.com/playlist?list=PLc0Bqc25RKTg&si=RezB3e_Dcfm7jOqA',
    highlights: ['WordPress setup and configuration', 'Themes, plugins, and page builders', 'Responsive websites and basic SEO'],
    magic: 'Go from a blank domain to a professional online home without needing to write every line of code yourself.',
    tools: 'WordPress, themes, plugins, page builders, hosting dashboards, and SEO tools',
    bestFor: 'Freelancers, business owners, bloggers, and aspiring website builders.',
    questions: [
      {
        id: 'q301',
        number: 1,
        title: 'Server Setup, Hosting Environment & Database Wiring',
        description: 'Install WordPress, configure SSL, permalinks, security headers, and essential plugin infrastructure.',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
      },
      {
        id: 'q302',
        number: 2,
        title: 'Elementor Dynamic Layouts & Responsive Design',
        description: 'Design custom hero headers, service grids, testimonial sliders, and dynamic contact forms.',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
      },
      {
        id: 'q303',
        number: 3,
        title: 'WooCommerce Storefront & Payment Integration',
        description: 'Configure product catalogs, cart layouts, currency settings, shipping rules, and checkout workflows.',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
      }
    ]
  },
  {
    id: 'c4',
    slug: 'artificial-intelligence',
    title: 'Advanced Artificial Intelligence',
    description: 'Explore AI tools, automation, image/video generation, AI productivity.',
    badge: 'Advanced',
    duration: '2 Months',
    level: 'Advanced',
    image: '/images/Ai.png',
    thumb: '/images/thumb-ai.jpeg',
    page: 'course-artificial-intelligence.html',
    topics: ['Prompt engineering', 'Image & video AI', 'AI automation'],
    playlist: 'https://youtube.com/playlist?list=PLQTO9V3Zldy4&si=y9dn_XdUIkElVZkj',
    highlights: ['Practical AI tools and workflows', 'Image and video generation', 'AI-powered productivity and automation'],
    magic: 'Use the new generation of AI as a creative partner and productivity engine for ideas, media, and everyday work.',
    tools: 'AI assistants, prompt workflows, image and video generators, and automation tools',
    bestFor: 'Students, professionals, creators, and curious learners who want to work smarter with AI.',
    questions: [
      {
        id: 'q401',
        number: 1,
        title: 'Advanced Prompt Engineering & Chain-of-Thought Workflows',
        description: 'Master few-shot prompting, system role instructions, and structured JSON output generation.',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
      },
      {
        id: 'q402',
        number: 2,
        title: 'Generative AI Image Generation & Multi-Model Workflows',
        description: 'Explore state-of-the-art diffusion models, negative prompts, aspect ratios, and seed consistency.',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
      },
      {
        id: 'q403',
        number: 3,
        title: 'AI Video Generation & Character Consistency',
        description: 'Generate cinematic AI video scenes, motion brush controls, camera pans, and voice lip-sync.',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
      },
      {
        id: 'q404',
        number: 4,
        title: 'AI Productivity Systems & Agentic Automation',
        description: 'Build an automated pipeline that ingests data, performs research, and generates executive summaries.',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
      }
    ]
  }
];

export const INITIAL_FAQS = [
  {
    q: 'Which course should I start with?',
    a: 'Start with the course that matches your current goal: YouTube Automation for content growth, Canva for visual design, WordPress for websites, or Artificial Intelligence for modern AI tools and workflows.'
  },
  {
    q: 'Are the courses suitable for beginners?',
    a: 'Yes. Each course introduces its main tools and practical concepts step by step, with a clear focus on useful skills rather than unnecessary theory.'
  },
  {
    q: 'What skills will I learn?',
    a: 'You will learn practical skills in content strategy, Canva design, WordPress website building, AI tools, automation, and digital productivity.'
  },
  {
    q: 'How do assignments and mentor review work?',
    a: 'Once you enroll, your course workspace lists every curriculum question. You watch the required video lesson, submit your answer or file, and send the final practical assignment for mentor review from the same workspace.'
  },
  {
    q: 'Do I get a certificate?',
    a: 'Yes. An e-certificate is issued after you complete the course requirements. Your registration name is used on the certificate, which is why the platform asks you to enter it exactly.'
  },
  {
    q: 'Can I switch between daylight and dark mode?',
    a: 'Yes. Use the theme button in the top navigation bar to switch between Daylight and Dark mode at any time. Your choice is remembered on this device.'
  }
];

export function CourseProvider({ children }) {
  const [courses, setCourses] = useState(() => {
    try {
      const stored = localStorage.getItem('as_courses_data');
      return stored ? JSON.parse(stored) : INITIAL_COURSES;
    } catch {
      return INITIAL_COURSES;
    }
  });

  // Track student question progress: { [studentId]: { [questionId]: boolean } }
  const [questionProgress, setQuestionProgress] = useState(() => {
    try {
      const stored = localStorage.getItem('as_question_progress');
      return stored ? JSON.parse(stored) : { 'student-1': { 'q101': true, 'q102': true } };
    } catch {
      return { 'student-1': { 'q101': true, 'q102': true } };
    }
  });

  // Submissions: [{ id, studentId, studentName, courseId, answersText, fileName, fileUrl, status: 'pending'|'approved'|'rejected', mentorFeedback, submittedAt }]
  const [submissions, setSubmissions] = useState(() => {
    try {
      const stored = localStorage.getItem('as_submissions');
      return stored ? JSON.parse(stored) : [
        {
          id: 'sub-1',
          studentId: 'student-1',
          studentName: 'Demo Student',
          courseId: 'c1',
          answersText: 'Completed my faceless channel niche research and tested AI voiceover generation for 3 sample scripts.',
          fileName: 'youtube-automation-project.pdf',
          fileUrl: '#',
          status: 'pending',
          mentorFeedback: '',
          submittedAt: new Date(Date.now() - 3600000 * 24).toISOString()
        }
      ];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('as_courses_data', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('as_question_progress', JSON.stringify(questionProgress));
  }, [questionProgress]);

  useEffect(() => {
    localStorage.setItem('as_submissions', JSON.stringify(submissions));
  }, [submissions]);

  const markQuestionComplete = (studentId, questionId, completed = true) => {
    setQuestionProgress(prev => {
      const studentMap = prev[studentId] || {};
      return {
        ...prev,
        [studentId]: {
          ...studentMap,
          [questionId]: completed
        }
      };
    });
  };

  const isQuestionComplete = (studentId, questionId) => {
    return Boolean(questionProgress[studentId]?.[questionId]);
  };

  const getCourseProgressPercentage = (studentId, courseId) => {
    const course = courses.find(c => c.id === courseId);
    if (!course || !course.questions || course.questions.length === 0) return 0;
    const completedCount = course.questions.filter(q => isQuestionComplete(studentId, q.id)).length;
    return Math.round((completedCount / course.questions.length) * 100);
  };

  const submitAssignment = ({ studentId, studentName, courseId, answersText, file }) => {
    const newSub = {
      id: 'sub-' + Date.now(),
      studentId,
      studentName,
      courseId,
      answersText,
      fileName: file ? file.name : 'written-submission.txt',
      fileUrl: file ? URL.createObjectURL(file) : '#',
      status: 'pending',
      mentorFeedback: '',
      submittedAt: new Date().toISOString()
    };
    setSubmissions(prev => [newSub, ...prev]);
    return newSub;
  };

  const reviewSubmission = (submissionId, status, mentorFeedback) => {
    setSubmissions(prev => prev.map(s => {
      if (s.id === submissionId) {
        return {
          ...s,
          status,
          mentorFeedback: String(mentorFeedback || '').trim(),
          reviewedAt: new Date().toISOString()
        };
      }
      return s;
    }));
  };

  const addCourse = (newCourseData) => {
    const newCourse = {
      id: 'c' + (courses.length + 1),
      slug: (newCourseData.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      badge: 'Advanced',
      duration: '2 Months',
      level: 'Advanced',
      image: '/images/Ai.png',
      thumb: '/images/thumb-ai.jpeg',
      questions: [],
      ...newCourseData
    };
    setCourses(prev => [...prev, newCourse]);
    return newCourse;
  };

  const updateCourse = (courseId, updates) => {
    setCourses(prev => prev.map(c => c.id === courseId ? { ...c, ...updates } : c));
  };

  const deleteCourse = (courseId) => {
    setCourses(prev => prev.filter(c => c.id !== courseId));
  };

  const addQuestion = (courseId, questionData) => {
    setCourses(prev => prev.map(c => {
      if (c.id === courseId) {
        const nextNum = (c.questions?.length || 0) + 1;
        const newQ = {
          id: 'q-' + Date.now(),
          number: nextNum,
          ...questionData
        };
        return {
          ...c,
          questions: [...(c.questions || []), newQ]
        };
      }
      return c;
    }));
  };

  const totalCapacity = 800;
  const enrolledCount = 428;

  return (
    <CourseContext.Provider value={{
      courses,
      faqs: INITIAL_FAQS,
      questionProgress,
      submissions,
      markQuestionComplete,
      isQuestionComplete,
      getCourseProgressPercentage,
      submitAssignment,
      reviewSubmission,
      addCourse,
      updateCourse,
      deleteCourse,
      addQuestion,
      totalCapacity,
      enrolledCount,
      remainingSeats: totalCapacity - enrolledCount
    }}>
      {children}
    </CourseContext.Provider>
  );
}

export function useCourses() {
  return useContext(CourseContext);
}
