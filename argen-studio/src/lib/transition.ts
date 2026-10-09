// 페이지 전환 연출을 거쳐 이동하고 싶을 때 쓴다 (링크가 아닌 버튼/코드에서 이동할 때).
// 일반 <Link>/<a> 클릭은 PageTransition 이 자동으로 가로채므로 이 함수가 필요 없다.
export const NAVIGATE_EVENT = 'argen:navigate';

export function navigateWithTransition(href: string) {
  window.dispatchEvent(new CustomEvent<string>(NAVIGATE_EVENT, { detail: href }));
}
