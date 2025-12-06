import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogContent,
} from "@/components/ui/alert-dialog";
import { Center } from "@/components/ui/center";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { Spinner } from "@/components/ui/spinner";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import "@/global.css";
import { useColorScheme } from "@/hooks/use-color-scheme";
import Entypo from "@expo/vector-icons/Entypo";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import migrations from "../drizzle/migrations";
import { db } from "@/db/utils";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

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
          <Stack.Screen
            name="index"
            options={{
              title: "Items",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
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
