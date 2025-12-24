import { Text } from "@/components/ui/text";
import { itemsTable } from "@/db/schema";
import { useEffect, useState } from "react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { db } from "@/db/utils";
import { Card } from "@/components/ui/card";
import { Image } from "@/components/ui/image";
import { Heading } from "@/components/ui/heading";
import { ScrollView, View } from "react-native";
import { Fab, FabIcon } from "@/components/ui/fab";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import AddItemModal from "@/components/modals/AddItemModal";

const Index = () => {
  const [items, setItems] = useState<(typeof itemsTable.$inferSelect)[] | null>(
    null
  );
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);

  const { bottom } = useSafeAreaInsets();

  useEffect(() => {
    const testInsert = async () => {
      const testData = {
        name: "testing",
        quantity: 30,
        expiryDate: new Date("2025-12-12"),
        testImgUri:
          "https://www.lovefoodhatewaste.com/sites/default/files/styles/open_graph_image/public/2022-06/Carrots.jpg.webp?itok=aBgglla9",
      };
      await db.insert(itemsTable).values([testData]).onConflictDoUpdate({
        target: itemsTable.name,
        set: testData,
      });
      const itemsFromDB = await db.select().from(itemsTable);
      setItems(itemsFromDB);
    };
    testInsert();
  }, []);

  const expiryClass = (itemExpiryDate: Date | null) => {
    if (itemExpiryDate) {
      const daysBeforeExpiryInDays = Math.ceil(
        (+itemExpiryDate - +new Date()) / (1000 * 60 * 60 * 24)
      );

      if (daysBeforeExpiryInDays > 7) {
        return "text-green-600";
      } else if (daysBeforeExpiryInDays > 3) {
        return "text-yellow-600";
      }
      return "text-red-600";
    }
  };

  return (
    <>
      <ScrollView className={`px-6 flex-1 pb-[${bottom}]`}>
        {items?.map((item) => (
          <Card className="p-5 rounded-lg m-3" key={item.id}>
            <View className="items-center">
              <Image
                source={{
                  uri:
                    item.imageUri ||
                    "https://thumbs.dreamstime.com/b/no-image-icon-vector-available-picture-symbol-isolated-white-background-suitable-user-interface-element-205805243.jpg",
                }}
                className="mb-6 h-[240px] w-full rounded-md"
                alt="image"
              />
            </View>
            <Heading size="lg" className="mb-4">
              {item.name}
            </Heading>
            <Text size="lg" className="mb-2">
              Quantity: {item.quantity}
            </Text>
            <Text size="lg" className="mb-2">
              Expiry Date:{" "}
              <Text className={expiryClass(item.expiryDate)}>
                {item.expiryDate?.toLocaleDateString()}
              </Text>
            </Text>
          </Card>
        ))}
      </ScrollView>
      <Fab size="lg" onPress={() => setIsAddItemModalOpen(true)}>
        <FabIcon as={() => <FontAwesome5 name="plus" />} />
      </Fab>
      <AddItemModal
        isOpen={isAddItemModalOpen}
        onClose={() => setIsAddItemModalOpen(false)}
        onSubmit={(value) => {
          console.log(value);
        }}
      />
    </>
  );
};

export default Index;
