import React from 'react'
import { Carousel } from 'antd'; // 여러 이미지를 슬라이드하면서 보여주는 효과

function ImageSlider(props) { // props 로 product.images 이미지 데이터 받음

    // axios.post(`http://${process.env.REACT_APP_BACKEND_SERVER}/api/file/up`, formData, config)
	// .then(response => {
	// 	if (response.data.success) {
	// 		setPath(response.data.path) // 업로드 경로
	// 		setOrgFileName(response.data.orgFileName)
	// 		props.refreshFunction(response.data.path, response.data.orgFileName, response.data.realFileName) /**부모 state에 전달 */
	// 	} else {
	// 		alert('파일 저장 실패')
	// 	}
	// })

    return (
        <div>
            <Carousel autoplay > 
            {/* autoplay : 자동 슬라이드 */}
                {props.images.map((image, index) => (
                    <div key={index}>
                        {/* <img style={{ width: '100%', maxHeight: '150px' }} */}
                        <img style={{ margin: 'auto', maxHeight: '150px' }}
                            src={`http://${process.env.REACT_APP_BACKEND_SERVER}/${image}`} 
                            alt=""/>
                    </div>
                ))}
            </Carousel>
        </div>
    )
}

export default ImageSlider
