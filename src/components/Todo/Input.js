import styled from "styled-components";
import PropTypes from "prop-types"

const InputStyle = styled.input`
  font-size: 18px;
  margin: 10px;
`

export default function Input ({value, handleInputChange}) {
  return (
    <InputStyle type='text' placeholder='todo' value={value} onChange={handleInputChange}/>
  )
}

Input.propTypes = {
  value: PropTypes.string,
  handleInputChange: PropTypes.func,
};