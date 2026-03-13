import { render, screen } from "@testing-library/react";
import Header from "./Header";
import { ThemeProvider } from "@/providers/ThemeProvider";

describe("환경 설정 테스트", () => {
  it("Header가 정상적으로 렌더링되어야 한다", () => {
    render(
      <ThemeProvider>
        <Header />
      </ThemeProvider>,
    );
    // 내 닉네임이나 'Yoo'가 있는지 확인
    expect(screen.getByText(/Yoo|ikki/i)).toBeInTheDocument();
  });
});
