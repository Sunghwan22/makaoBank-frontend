import styled from 'styled-components';

const ThemeButton = styled.button`
  background-image: url(${(props) => props.theme.icon.backgroundImage});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  padding: 1em;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

export default ThemeButton;
