import Loader from 'react-loader-spinner'
import './index.css'

const LoadingView = () => (
  <div testid="loader" className="loader-container">
    <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
  </div>
)
export default LoadingView
