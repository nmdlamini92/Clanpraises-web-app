import { Comment } from "./Comment"

export function CommentList({ comments, passOpenLogin, passOpenReport, passOpenDelete }) {


  const handlePopLoginModal = () => {
    passOpenLogin()
  }

  const handlePopReportModal = (reportData) => {
    passOpenReport(reportData)
  }

  const handlePopDeleteModal = (deleteData) => {
    passOpenDelete(deleteData)
  }

  return comments.map(comment => (
    <div key={comment.id} className="comment-stack">
      <Comment {...comment}  popLoginModal={handlePopLoginModal} popReportModal={handlePopReportModal} popDeleteModal={handlePopDeleteModal}/>
    </div>
  ))
}
