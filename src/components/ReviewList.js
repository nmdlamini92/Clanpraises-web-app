import { Review } from "./Review"

export function ReviewList({ reviews, passOpenLogin, passOpenReport, passOpenDelete }) {

  const handlePopLoginModal = () => {
    passOpenLogin()
}

const handlePopReportModal = (reportData) => {
  passOpenReport(reportData)
}

const handlePopDeleteModal = (deleteData) => {
  passOpenDelete(deleteData)
}

  return reviews.map(review => (
    <div key={review.id} className="comment-stack">
      <Review {...review} popLoginModal={handlePopLoginModal} popReportModal={handlePopReportModal} popDeleteModal={handlePopDeleteModal}/>
    </div>
  ))
}
