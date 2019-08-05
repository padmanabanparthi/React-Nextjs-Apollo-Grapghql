import App from '../components/App'
import Header from '../components/Header'
import Slickcorousel from '../components/Slickcorousel'
import HeaderVideo from '../components/HeaderVideo';

export default () => (
  <App>
    <Header />
   <div style={{width:'70%'}}>
   <Slickcorousel />
   {/* <HeaderVideo/> */}
   </div>
  </App>
)
