import { loadPublishedCourses } from '@bolthorn/academy-content'
import CourseList from './CourseList'

export default function CoursesPage() {
  return <CourseList courses={loadPublishedCourses()} />
}
