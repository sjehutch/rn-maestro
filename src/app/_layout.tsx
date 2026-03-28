import { Stack, useRouter } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Pressable, Text } from "react-native";
import { ThemeProvider, useAppTheme } from "@core/theme";

const AppStack = () => {
  const theme = useAppTheme();
  const router = useRouter();

  return (
    <Stack
      initialRouteName="index"
      screenOptions={{
        contentStyle: { backgroundColor: theme.colors.background },
        headerStyle: { backgroundColor: theme.colors.background },
        headerTintColor: theme.colors.text,
        headerShadowVisible: false
      }}
    >
      <Stack.Screen
        name="(auth)/login"
        options={{
          presentation: "modal",
          headerTitle: "Login",
          headerRight: () => (
            <Pressable
              onPress={() => {
                router.back();
              }}
              hitSlop={10}
            >
              <Text
                style={{
                  color: theme.colors.text,
                  fontSize: 20,
                  fontWeight: "700"
                }}
              >
                X
              </Text>
            </Pressable>
          )
        }}
      />
    </Stack>
  );
};

export const RootLayout = () => {
  // We create the QueryClient once so it stays the same while the app runs.
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AppStack />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

// Expo Router needs a default export for route files.
export default RootLayout;
