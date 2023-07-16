import './index.css'

const FailureView = props => {
  const {retryAgain} = props
  const onTryAgain = () => {
    retryAgain()
  }
  return (
    <div className="failureDiv">
      <img
        className="failureImg"
        src="https://res.cloudinary.com/djyawllgy/image/upload/v1689073252/BookhubWeb/Group_7522_mgpcoq.jpg"
        alt="failure view"
      />
      <p>Something went wrong, Please try again.</p>
      <button type="button" onClick={onTryAgain} className="retrybtn">
        Try Again
      </button>
    </div>
  )
}
export default FailureView
