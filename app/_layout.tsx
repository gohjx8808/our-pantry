import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import * as SQLite from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { View } from "react-native";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "../drizzle/migrations";
import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogContent,
} from "@/components/ui/alert-dialog";
import { Text } from "@/components/ui/text";
import { Spinner } from "@/components/ui/spinner";
import { VStack } from "@/components/ui/vstack";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const expo = SQLite.openDatabaseSync("db.db");
  const db = drizzle(expo);

  const { success, error } = useMigrations(db, migrations);
  const [isMigrating, setIsMigrating] = useState(false);

  useEffect(() => {
    if (!success && !error) {
      setIsMigrating(true);
    } else {
      setIsMigrating(false);
    }
  }, [error, success]);

  if (error) {
    return (
      <View>
        <Text>Migration error: {error.message}</Text>
      </View>
    );
  }

  return (
    <GluestackUIProvider mode="dark">
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="modal"
            options={{ presentation: "modal", title: "Modal" }}
          />
        </Stack>
        <StatusBar style="auto" />
        <AlertDialog isOpen={isMigrating} closeOnOverlayClick={false}>
          <AlertDialogBackdrop />
          <AlertDialogContent>
            <AlertDialogBody>
              <VStack space="lg">
                <Spinner />
                <Text className="text-center">
                  Please wait for a moment. Database migration is in progress.
                </Text>
              </VStack>
            </AlertDialogBody>
          </AlertDialogContent>
        </AlertDialog>
      </ThemeProvider>
    </GluestackUIProvider>
  );
}
