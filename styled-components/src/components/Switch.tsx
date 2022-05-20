import styled, { css } from 'styled-components';

const SwitchStyle = styled.div`
  input[type='checkbox'] {
    display: none;
  }

  .label__on-off {
    overflow: hidden;
    position: relative;
    display: inline-block;
    width: 58px;
    height: 26px;
    -webkit-border-radius: 13px;
    -moz-border-radius: 13px;
    border-radius: 13px;
    background-color: #ed4956;
    color: #fff;
    font-weight: bold;
    cursor: pointer;
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    -ms-transition: all 0.3s;
    -o-transition: all 0.3s;
    transition: all 0.3s;
  }

  .label__on-off > * {
    vertical-align: sub;
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    -ms-transition: all 0.3s;
    -o-transition: all 0.3s;
    transition: all 0.3s;
    font-size: 14px;
  }

  .label__on-off .marble {
    position: absolute;
    top: 1px;
    left: 1px;
    display: block;
    width: 24px;
    height: 24px;
    background-color: #fff;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    -webkit-box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    -moz-box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  }

  .input__on-off:checked + .label__on-off {
    background-color: #0bba82;
  }

  .input__on-off:checked + .label__on-off .marble {
    left: 33px;
  }

  h1 {
    color: ${({ theme }) => theme.mainColor};
  }
`;

const Switch = () => {
  return (
    <SwitchStyle>
      <h1>안녕하세요</h1>
      <input type='checkbox' id='switch1' name='switch1' className='input__on-off' />
      <label htmlFor='switch1' className='label__on-off'>
        <span className='marble'></span>
      </label>
    </SwitchStyle>
  );
};

export default Switch;
