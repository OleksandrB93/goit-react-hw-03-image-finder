import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = (props) => (
  <ContentLoader 
  className="ImageGalleryItem  ImageGalleryItem-imag"
    speed={0.75}
    width={360}
    height={260}
    viewBox="0 0 360 260"
    backgroundColor="#d7d5d5"
    foregroundColor="#c5c4c4"
    {...props}
  >
    <rect x="0" y="0" rx="5" ry="5" width="360" height="260" />
  </ContentLoader>
)

export default MyLoader
