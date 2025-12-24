import Ionicons from "@expo/vector-icons/Ionicons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button, ButtonText } from "../ui/button";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from "../ui/form-control";
import { Heading } from "../ui/heading";
import { Input, InputField } from "../ui/input";
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "../ui/modal";
import addItemSchema, { AddItemFormData } from "@/schemas/addItemSchema";

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (value: AddItemFormData) => void;
}

const AddItemModal = (props: AddItemModalProps) => {
  const { isOpen, onClose, onSubmit } = props;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AddItemFormData>({
    defaultValues: { quantity: 1 },
    resolver: zodResolver(addItemSchema),
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <Heading size="lg">Add New Ingredient</Heading>
          <ModalCloseButton>
            <Ionicons name="close-outline" size={24} color="black" />
          </ModalCloseButton>
        </ModalHeader>
        <ModalBody>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <FormControl size="md" isInvalid={!!errors.name}>
                <FormControlLabel>
                  <FormControlLabelText>Name</FormControlLabelText>
                </FormControlLabel>
                <Input className="my-1" size="md">
                  <InputField
                    placeholder="Ingredient Name"
                    value={value}
                    onChangeText={onChange}
                  />
                </Input>
                <FormControlError>
                  <FormControlErrorText className="text-red-500">
                    {errors.name?.message}
                  </FormControlErrorText>
                </FormControlError>
              </FormControl>
            )}
            name="name"
          />
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <FormControl size="md" isInvalid={!!errors.name}>
                <FormControlLabel>
                  <FormControlLabelText>Quantity</FormControlLabelText>
                </FormControlLabel>
                <Input className="my-1" size="md">
                  <InputField
                    placeholder="Quantity"
                    value={value.toString()}
                    onChangeText={onChange}
                  />
                </Input>
                <FormControlError>
                  <FormControlErrorText className="text-red-500">
                    {errors.quantity?.message}
                  </FormControlErrorText>
                </FormControlError>
              </FormControl>
            )}
            name="quantity"
          />
        </ModalBody>
        <ModalFooter>
          <Button
            variant="outline"
            action="secondary"
            className="mr-3"
            onPress={onClose}
          >
            <ButtonText>Cancel</ButtonText>
          </Button>
          <Button onPress={handleSubmit(onSubmit)}>
            <ButtonText>Submit</ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddItemModal;
