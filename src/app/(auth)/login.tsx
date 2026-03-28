import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { z } from "zod";
import { Button } from "@components/Button";
import { useAppTheme } from "@core/theme";
import { TextField } from "@components/TextField";
import { useLogin } from "@features/auth/hooks/useLogin";
import { logger } from "@shared/logger/logger";

const loginSchema = z.object({
  userName: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required")
});

type LoginForm = z.infer<typeof loginSchema>;

export const LoginScreen = () => {
  const theme = useAppTheme();
  const router = useRouter();
  const { mutateAsync, isPending, error } = useLogin();

  const { control, handleSubmit } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { userName: "", password: "" }
  });

  const onSubmit = handleSubmit(async (credentials) => {
    // We always wrap async calls in try/catch so errors are predictable.
    try {
      // This calls the fake API and updates the auth store on success.
      await mutateAsync(credentials);
      router.replace("/");
    } catch (submitError) {
      logger.error("Login failed", { error: submitError });
    }
  });

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: theme.colors.background }
      ]}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.formShell}>
        <View style={styles.headerBlock}>
          <Text style={[styles.title, { color: theme.colors.text }]}>
            Welcome back
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.text }]}>
            Sign in to continue.
          </Text>
        </View>

        <View
          style={[
            styles.formCard,
            {
              backgroundColor: theme.colors.card,
              borderColor: theme.colors.border
            }
          ]}
        >
          <Controller
            control={control}
            name="userName"
            render={({ field: { onChange, value: fieldValue }, fieldState }) => (
              <TextField
                label="Username"
                value={fieldValue}
                onChangeText={onChange}
                autoCapitalize="none"
                errorMessage={fieldState.error?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value: fieldValue }, fieldState }) => (
              <TextField
                label="Password"
                value={fieldValue}
                onChangeText={onChange}
                secureTextEntry
                errorMessage={fieldState.error?.message}
              />
            )}
          />

          {error ? (
            <Text style={[styles.errorText, { color: theme.colors.danger }]}>
              Login failed. Try again.
            </Text>
          ) : null}

          <Button
            title="Sign In"
            onPress={() => {
              void onSubmit();
            }}
            loading={isPending}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 32,
    paddingBottom: 32
  },
  formShell: {
    width: "100%",
    maxWidth: 420,
    alignSelf: "center",
    gap: 24
  },
  headerBlock: {
    gap: 8
  },
  formCard: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    lineHeight: 36
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 22,
    opacity: 0.7
  },
  errorText: {
    marginBottom: 12
  }
});

// Expo Router needs a default export for route files.
export default LoginScreen;
