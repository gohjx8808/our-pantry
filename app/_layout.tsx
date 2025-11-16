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
import Entypo from "@expo/vector-icons/Entypo";
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
import { Center } from "@/components/ui/center";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const expo = SQLite.openDatabaseSync("db.db");
  const db = drizzle(expo);

  const { success, error } = useMigrations(db, migrations);
  const [isMigrating, setIsMigrating] = useState(false);
  const [isMigrationError, setMigrationError] = useState(false);

  useEffect(() => {
    if (error) {
      setMigrationError(true);
      setIsMigrating(false);
    } else {
      if (!success) {
        setIsMigrating(true);
      } else {
        setIsMigrating(false);
      }
    }
  }, [error, success]);

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
        {/* db migration in progress dialog */}
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
        {/* db migration error dialog */}
        <AlertDialog isOpen={isMigrationError} closeOnOverlayClick={false}>
          <AlertDialogBackdrop />
          <AlertDialogContent>
            <AlertDialogBody>
              <VStack space="lg">
                <Center>
                  <Entypo name="cross" size={24} color="red" />
                </Center>
                <Text className="text-center">
                  Migration error: {error?.message}.{"\n"}
                  Please contact support or try again.
                </Text>
              </VStack>
            </AlertDialogBody>
          </AlertDialogContent>
        </AlertDialog>
      </ThemeProvider>
    </GluestackUIProvider>
  );
}
