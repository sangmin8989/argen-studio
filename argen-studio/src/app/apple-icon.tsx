import { ImageResponse } from 'next/og';

// iPhone/iPad 에서 "홈 화면에 추가"할 때 쓰는 아이콘. 사이트 로고의 "A" 워드마크를 따른다.
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1C1917',
          color: '#FAF8F5',
          fontSize: 120,
          fontFamily: 'serif',
        }}
      >
        A
      </div>
    ),
    { ...size }
  );
}
