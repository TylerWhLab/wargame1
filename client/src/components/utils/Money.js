function Money(props) {
    return props ? props.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : props;
}
    
export default Money
