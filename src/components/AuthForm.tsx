"use client";

import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AuthForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const supabase = useSupabaseClient();

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/perfil`,
      },
    });
    if (error) toast.error(error.message);
  };

  return (
    <div
      className={cn("flex justify-center items-center min-h-screen", className)}
      {...props}
    >
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Bienvenido</CardTitle>
          <CardDescription>
            Usa tu cuenta de Google para iniciar sesión.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            type="button"
            onClick={handleGoogleLogin}
            variant="outline"
            className="w-full"
          >
            Iniciar con Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
