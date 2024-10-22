import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import ForgotPassPage from "../pages/ForgotPassPage";
import AdminDashboardPage from "../pages/admin/AdminDashboardPage";
import CompanyManagementPage from "../pages/admin/CompanyManagementPage";
import DashboardManagementPage from "../pages/admin/DashboardManagementPage";
import EmployeeManagementPage from "../pages/admin/EmployeeManagementPage";
import EmployeeEvaluationPage from "../pages/admin/EmployeeEvaluationPage";
import QuizSelect from "../pages/admin/QuizSelect";
import VideoUploadPage from "../pages/admin/VideoUploadPage";
import VideoUploadWorkPage from "../pages/admin/VideoUploadWorkPage";
import EmployeeReview from "../pages/admin/EmployeeReview";
import EmployeeManagementListPage from "../pages/admin/EmployeeManagementListPage";
import ProblemCollectionManagement from "../pages/admin/ProblemCollectionManagement";
import EducationManagement from "../pages/admin/EducationManagementPage";
import LessonManagement from "../pages/admin/LessonManagementPage";
import WorkManagement from "../pages/admin/WorkManagementPage";
import CompanyManagementListPage from "../pages/admin/CompanyManagementlistPage";
import UserDashboardPage from "../pages/user/UserDashboardPage";
import QuizListPage from "../pages/user/QuizListPage";
import StudyCoursePage from "../pages/user/StudyCoursePage";
import UserProfilePage from "../pages/user/UserProfilePage";
import QuizDo from "../pages/user/QuizDoPage";
import OPLManagementPage from "../pages/admin/OPLManagementPage";
import CreateQuizPage from "../pages/admin/CreateQuizPage";
import PDFLessionPage from "../pages/admin/PDFLessionPage";
import PDFrevisionhistoryPage from "../pages/admin/PDFrevisionhistoryPage";
import RevisionHistoryPage from "../pages/admin/RevisionHistoryPage";
import PDFEducationPage from "../pages/admin/PDFEducationPage";
import OplUploadPage from "../pages/admin/OplUploadPage";
import LessonCreatePage from "../pages/admin/LessonCreatePage";
import CreateExamPage from "../pages/admin/CreateExamPage";
import FileTemplatePage from "../pages/admin/FileTemplatePage";
import OPLTemplate from "../pages/admin/OPLTemplatePage";
import AttemptReviewPage from "../pages/user/AttemptReviewPage";
import QuizWatchPage from "../pages/admin/QuizWatchPage";
import EnrollUserPage from "../pages/admin/EnrollUserPage";
import EnrollCreatePage from "../pages/admin/EnrollCreatePage";
import DashboardManagement from "../components/user/DashboardManagement";
import EducationManagementUser from "../pages/user/EducationManagementPage";
import WorkManagementUser from "../pages/user/WorkManagementPage";
import WorkManagementTemplateUser from "../pages/user/FileTemplatePage";
import UploadWorkPage from "../pages/admin/UploadWorkPage";
import OplPage from "../pages/user/OplPage";
import OplTemplatePage from "../pages/user/OplTemplatePage";
import CompanyDashboardPage from "../pages/admin/CompanyDashboardPage";
import EditCompanyPage from "../pages/admin/EditCompanyPage";
import CreateCompanyPage from "../pages/admin/CreateCompanyPage";
import DepartmentDashboardPage from "../pages/admin/DepartmentDashboard.Page";
import EditDepartmentPage from "../pages/admin/EditDepartment";
import CreateDepartmentPage from "../pages/admin/CreateDepartmentPage";
import EditUserPage from "../pages/admin/EditUserPage";
import CreateUserPage from "../pages/admin/CreateUserPage";
import UserManagementPage from "../pages/admin/UserManagementPage";
import EditQuestionPage from "../pages/admin/EditQuestionPage"


const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassPage />,
  },
  {
    path: "/admin/dashboard",
    element: <AdminDashboardPage />,
  },
  {
    path: "/admin/company-management",
    element: <CompanyManagementPage />,
  },
  {
    path: "/admin/dashboard-management",
    element: <DashboardManagementPage />,
  },
  {
    path: "/admin/employee-management",
    element: <EmployeeManagementPage />,
  },
  {
    path: "/admin/employee-evaluation",
    element: <EmployeeEvaluationPage />,
  },
  {
    path: "/admin/dashboard-management/video-upload",
    element: <LessonCreatePage />,
  },
  {
    path: "/admin/education-management/video-upload",
    element: <VideoUploadPage />,
  },
  {
    path: "/admin/enrollCreate",
    element: <EnrollCreatePage />,
  },
  {
    path: "/admin/work-management/uploadwork",
    element: <UploadWorkPage />,
  },
  {
    path: "/admin/work-management/video-upload",
    element: <VideoUploadWorkPage />,
  },
  {
    path: "/admin/lesson-management/opl-create",
    element: <OPLManagementPage />,
  },
  {
    path: "/admin/employee-review",
    element: <EmployeeReview />,
  },
  {
    path: "/admin/employee-review",
    element: <EmployeeReview />,
  },
  {
    path: "/admin/quiz-select",
    element: <QuizSelect />,
  },

  {
    path: "/admin/editquestionpage",
    element: <EditQuestionPage />,
  },

  {
    path: "/admin/quizwatch",
    element: <QuizWatchPage />,
  },
  {
    path: "/admin/problem",
    element: <ProblemCollectionManagement />,
  },
  {
    path: "/admin/problem/create-quiz",
    element: <CreateQuizPage />,
  },
  {
    path: "/admin/problem/create-exam",
    element: <CreateExamPage />,
  },
  {
    path: "/admin/education-management",
    element: <EducationManagement />,
  },
  {
    path: "/admin/lesson-management",
    element: <LessonManagement />,
  },
  {
    path: "/admin/work-management",
    element: <WorkManagement />,
  },
  {
    path: "/admin/work-management/create-form",
    element: <VideoUploadPage />,
  },
  {
    path: "/admin/company-management-list",
    element: <CompanyManagementListPage />,
  },
  {
    path: "/admin/employee-management-list",
    element: <EmployeeManagementListPage />,
  },
  {
    path: "/admin/opl-management",
    element: <OPLManagementPage />,
  },
  {
    path: "/admin/pdf-lession",
    element: <PDFLessionPage />,
  },
  {
    path: "/admin/revisionHistoryPage",
    element: <RevisionHistoryPage />,
  },
  {
    path: "/admin/pdfrevisionhistory",
    element: <PDFrevisionhistoryPage />,
  },
  {
    path: "/admin/pdfeducationPage",
    element: <PDFEducationPage />,
  },
  {
    path: "/admin/create-quiz",
    element: <CreateQuizPage></CreateQuizPage>,
  },
  {
    path: "/admin/oplupload",
    element: <OplUploadPage />,
  },
  {
    path: "/admin/opl-template",
    element: <OPLTemplate />,
  },
  {
    path: "/admin/file-template",
    element: <FileTemplatePage />,
  },
  {
    path: "/admin/create-quiz",
    element: <CreateQuizPage />,
  },
  {
    path: "/admin/problem/create-quiz",
    element: <CreateQuizPage />,
  },
  {
    path: "/admin/problem/create-exam",
    element: <CreateExamPage />,
  },
  {
    path: "/admin/quizwatch",
    element: <QuizWatchPage />,
  },
  {
    path: "/admin/enrolluser",
    element: <EnrollUserPage />,
  },
  {
    path: "/user/dashboard",
    element: <UserDashboardPage />,
  },
  {
    path: "user/quiz-list",
    element: <QuizListPage />,
  },
  {
    path: "user/study-course",
    element: <StudyCoursePage />,
  },
  {
    path: "user/profile",
    element: <UserProfilePage />,
  },
  {
    path: "/user/quiz-do/:examId/:attemptId",
    element: <QuizDo />,
  },
  // {
  //   path: "/user/attempt-review",
  //   element: <AttemptReviewPage />,
  // },
  {
    path: "/user/dashboard-management",
    element: <DashboardManagement />, //course dashboard for user
  },
  {
    path: "/user/education-management",
    element: <EducationManagementUser />,
  },
  {
    path: "/user/work-management",
    element: <WorkManagementUser />,
  },
  {
    path: "/user/work-management/template",
    element: <WorkManagementTemplateUser />,
  },
  {
    path: "/user/opl",
    element: <OplPage />,
  },
  {
    path: "/user/opl/template",
    element: <OplTemplatePage />,
  },
  { path: "/admin/company/", element: <CompanyDashboardPage /> },
  { path: "/admin/company/edit/:id", element: <EditCompanyPage /> },
  { path: "/admin/company/create", element: <CreateCompanyPage /> },
  { path: "/admin/department/", element: <DepartmentDashboardPage /> },
  { path: "/admin/department/edit/:id", element: <EditDepartmentPage /> },
  { path: "/admin/department/create", element: <CreateDepartmentPage /> },
  { path: "/admin/user-manage/", element: <UserManagementPage /> },
  { path: "/admin/user-manage/edit/:id", element: <EditUserPage /> },
  { path: "/admin/user-manage/create", element: <CreateUserPage /> },
]);

export default function Route() {
  return <RouterProvider router={router} />;
}
