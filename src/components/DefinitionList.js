//import { Comment } from "./Comment"
import { Definition } from "./Definition"

export function DefinitionList({definitions, passDefReviews, passOpenDefComments, passOpenLogin, passOpenReport, passOpenDelete}) {

  const handleChildData = (defData) => {   //defData = {defId: id, defReviews: reviews}
  passDefReviews(defData);
  }

  const handlePopDefCommentsModal = (defData) => {
    passOpenDefComments(defData)
  }


  const handlePopLoginModal = () => {
      passOpenLogin()
  }

  const handlePopReportModal = (reportData) => {
    passOpenReport(reportData)
  }

  const handlePopDeleteModal = (deleteData) => {
    passOpenDelete(deleteData)
  }

  return definitions.map(definition => (
    <div key={definition.id} className="comment-stack">
      <Definition {...definition} onDataChange={handleChildData} popDefCommentsModal={handlePopDefCommentsModal} popLoginModal={handlePopLoginModal} popReportModal={handlePopReportModal} popDeleteModal={handlePopDeleteModal}/>
    </div>
  ))
}
