import styled from 'styled-components';

const centeredSpaceBetween = {
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'row'
};

const centeredRow = {
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'row'
};

const centeredFullWidthRow = {
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'row',
  alignItems: 'center',
  width: '100%',
  fontSize: '1.2rem',
  marginTop: '20px'
};

const centeredFullWidthColumn = {
  height: '50vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  fontSize: '1.2rem',
  marginTop: '20px'
};

const centeredFullWidthColumnMdComponent = styled.div`
  height: '30vh';
  display: 'flex';
  justify-content: 'center';
  flex-direction: 'column';
  align-items: 'center';
  width: '100%';
  font-size: '1.2rem';
  margin-top: '20px';

  @media only screen and (max-width: 768px) {
  }
`;

const centeredFullWidthColumnMd = {
  minHeight: '30vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  fontSize: '1.2rem',
  marginTop: '20px'
};

const rightAlignRow = {
  display: 'flex',
  justifyContent: 'flex-end',
  flexDirection: 'row',
  width: '90%'
};

export {
  centeredSpaceBetween,
  centeredRow,
  centeredFullWidthRow,
  rightAlignRow,
  centeredFullWidthColumn,
  centeredFullWidthColumnMd
};
