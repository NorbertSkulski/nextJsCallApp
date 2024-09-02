import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <main className=" h-dvh flex justify-center items-center">
      <SignIn forceRedirectUrl="/dashboard" />
    </main>
  );
}
