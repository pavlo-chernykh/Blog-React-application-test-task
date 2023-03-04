import { COLORS, FONTS, SPACES } from 'src/consts';
import styled from 'styled-components';


export const PostItemWrapper = styled.div`
  padding: ${SPACES.l};

`;

export const PostTitle = styled.div`
  font-size: ${FONTS.SIZES.l};
  font-weight: ${FONTS.WEIGHTS.bold};
  margin-bottom: ${SPACES.l};
  color: ${COLORS.PRIMARY};
`;
export const PostBody = styled.div`
  font-size: ${FONTS.SIZES.m};
  font-weight: ${FONTS.WEIGHTS.normal};
  margin-bottom: ${SPACES.l};
  color: ${COLORS.PRIMARY};
`;

export const ListWrapper = styled.div`
  width: 80%;
  margin: 0 auto;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
`;

export const StyledComment = styled.div`
  margin-bottom: 20px;
  text-align: center;

  p {
    min-width: 70vw;
    margin: 0;
    padding: 0;
    font-size: 16px;
    line-height: 1.5;
  }
`