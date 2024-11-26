import styled from 'styled-components/native';
import { PressableProps, StyleProp, ViewStyle } from 'react-native';

// 버튼의 기본 스타일을 담당하는 컴포넌트
// variant에 따라 너비가 다름 (short: 300px, long: 370px)
const StyledPressable = styled.Pressable<{ $variant: 'short' | 'long' }>`
  width: ${props => props.$variant === 'short' ? '300px' : '370px'};
  height: 48px;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.disabled ? '#CCCCCC' : '#FF6B6B'};
`;

// 버튼 내부 텍스트 스타일 컴포넌트
// 버튼이 눌렸을 때($isPressed)의 투명도 처리
const ButtonText = styled.Text<{ $isPressed: boolean }>`
  color: #FFFFFF;
  font-size: 16px;
  font-family: 'SCDream5';
  opacity: ${props => props.$isPressed ? 0.8 : 1};
`;

// 버튼 컴포넌트에서 사용할 props 타입 정의
// PressableProps의 모든 속성을 상속받아 사용
interface ButtonProps extends PressableProps {
  text: string;                 // 버튼에 표시될 텍스트
  style?: StyleProp<ViewStyle>; // 추가적인 스타일 정의 (선택사항)
}

// 300px 너비의 짧은 버튼 컴포넌트
// text: 버튼에 표시될 텍스트
// onPress: 버튼 클릭 시 실행될 함수
// disabled: 버튼 비활성화 여부 (기본값: false)
// style: 추가 스타일 (선택사항)
export const ShortBtn = ({ 
  text,
  onPress, 
  disabled = false,
  style,
  ...props
}: ButtonProps) => {
  return (
    <StyledPressable
      $variant="short"
      onPress={onPress}
      disabled={disabled}
      style={style}
      {...props}
    >
      {({ pressed }) => (
        <ButtonText $isPressed={pressed}>
          {text}
        </ButtonText>
      )}
    </StyledPressable>
  );
};

// 370px 너비의 긴 버튼 컴포넌트
// text: 버튼에 표시될 텍스트
// onPress: 버튼 클릭 시 실행될 함수
// disabled: 버튼 비활성화 여부 (기본값: false)
// style: 추가 스타일 (선택사항)
export const LongBtn = ({ 
  text,
  onPress, 
  disabled = false,
  style,
  ...props
}: ButtonProps) => {
  return (
    <StyledPressable
      $variant="long"
      onPress={onPress}
      disabled={disabled}
      style={style}
      {...props}
    >
      {({ pressed }) => (
        <ButtonText $isPressed={pressed}>
          {text}
        </ButtonText>
      )}
    </StyledPressable>
  );
};

// 버튼 컴포넌트들을 하나의 객체로 내보내기
const Buttons = {
  ShortBtn,
  LongBtn,
};

export default Buttons;