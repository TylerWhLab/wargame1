import React from 'react'
import { Button, Descriptions } from 'antd';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../../_actions/user_actions';
import Money from '../../../utils/Money';


function ProductInfo(props) {

    const dispatch = useDispatch();

    // 카트에 담기 redux
    const onAddToCartClick = () => {

        if (props.user.userData && !props.user.userData.isAuth) {
            // alert('로그인이 필요한 기능입니다. 로그인 페이지로 이동합니다.');
            const message = '로그인이 필요한 기능입니다. 로그인 페이지로 이동하시겠습니까?';
            if ( window.confirm(message) ) {
                props.history.push('/login');
            }
            return false;
        }

        dispatch(addToCart(props.detail.productId))
            .then(response => {
                const msg = '카트에 담겼습니다. 카트로 이동하시겠습니까?';
                if ( window.confirm(msg) ) {
                    props.history.push('/user/cart');
                }
            })
    }

    return (
        <div>
            <Descriptions title="상품 정보">
                <Descriptions.Item label="가격">{Money(props.detail.price)} 원</Descriptions.Item>
                <Descriptions.Item label="재고">{props.detail.sold}</Descriptions.Item>
                {/* <Descriptions.Item label="조회수">{props.detail.views}</Descriptions.Item> */}
                <Descriptions.Item label="등록일자">{String(props.detail.modDate).substring(0,10)}</Descriptions.Item>
                <Descriptions.Item label="설명">{props.detail.description}</Descriptions.Item>
            </Descriptions>

            <br />
            <br />
            <br />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button size="large" shape="round" type="danger" onClick={onAddToCartClick}>
                    카트에 담기
                </Button>
            </div>


        </div>
    )
}

export default ProductInfo
