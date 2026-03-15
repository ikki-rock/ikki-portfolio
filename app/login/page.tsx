import { Input } from "@/components/ui/input";

export default function LoginPage() {
  return (
    // align-center를 items-center로 수정!
    <main className="bg-red-300 min-h-dvh w-full flex flex-col justify-center items-center">
      <div className="w-full max-w-[64rem] px-6 text-center flex flex-col justify-center items-center">
        <h1 className=" text-h1 font-bold">Login</h1>
        <p className="">please sign in to use admin features</p>
        <div className="space-y-2">
          {" "}
          {/* Input 너비 조절용 컨테이너 */}
          <Input placeholder="Email" />
          <Input placeholder="Password" />
        </div>
      </div>
    </main>
  );
}
