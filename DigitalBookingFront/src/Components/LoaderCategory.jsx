import React from 'react'
import styles from "../Styles/Card.module.css";
import stylesLoader from "../Styles/Loading.module.css"


const LoaderCategory = () => {
  return (
   <>
   <div className={stylesLoader.boxCategory}>
   <div className={stylesLoader.cardCategory}>
      <div className={`${stylesLoader.boxImg} ${stylesLoader.pulseAnimation}`}></div>        
      <div className= {`${stylesLoader.boxTitleCategory} ${stylesLoader.pulseAnimation}`} ></div>
      <div className= {`${stylesLoader.boxDescription}  ${stylesLoader.pulseAnimation}`}></div>
    </div>
    
    <div className={stylesLoader.cardCategory}>
      <div className={`${stylesLoader.boxImg} ${stylesLoader.pulseAnimation}`}></div>        
      <div className= {`${stylesLoader.boxTitleCategory} ${stylesLoader.pulseAnimation}`} ></div>
      <div className= {`${stylesLoader.boxDescription}  ${stylesLoader.pulseAnimation}`}></div>
    </div>
    
    <div className={stylesLoader.cardCategory}>
      <div className={`${stylesLoader.boxImg} ${stylesLoader.pulseAnimation}`}></div>        
      <div className= {`${stylesLoader.boxTitleCategory} ${stylesLoader.pulseAnimation}`} ></div>
      <div className= {`${stylesLoader.boxDescription}  ${stylesLoader.pulseAnimation}`}></div>
    </div>
    
    <div className={stylesLoader.cardCategory}>
      <div className={`${stylesLoader.boxImg} ${stylesLoader.pulseAnimation}`}></div>        
      <div className= {`${stylesLoader.boxTitleCategory} ${stylesLoader.pulseAnimation}`} ></div>
      <div className= {`${stylesLoader.boxDescription}  ${stylesLoader.pulseAnimation}`}></div>
    </div>
    <div className={stylesLoader.cardCategory}>
      <div className={`${stylesLoader.boxImg} ${stylesLoader.pulseAnimation}`}></div>        
      <div className= {`${stylesLoader.boxTitleCategory} ${stylesLoader.pulseAnimation}`} ></div>
      <div className= {`${stylesLoader.boxDescription}  ${stylesLoader.pulseAnimation}`}></div>
    </div>
    
  </div>
   
  
   </>
  )
}

export default LoaderCategory