import addItemSchema, { AddItemFormData } from "@/schemas/addItemSchema";
import Ionicons from "@expo/vector-icons/Ionicons";
import { zodResolver } from "@hookform/resolvers/zod";
import DateTimePicker from "@react-native-community/datetimepicker";
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
            render={({ field: { onChange, value, onBlur } }) => (
              <FormControl size="md" isInvalid={!!errors.name}>
                <FormControlLabel>
                  <FormControlLabelText>Name</FormControlLabelText>
                </FormControlLabel>
                <Input className="my-1" size="md">
                  <InputField
                    placeholder="Ingredient Name"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
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
            render={({ field: { onChange, value, onBlur } }) => (
              <FormControl size="md" isInvalid={!!errors.quantity}>
                <FormControlLabel>
                  <FormControlLabelText>Quantity</FormControlLabelText>
                </FormControlLabel>
                <Input className="my-1" size="md">
                  <InputField
                    placeholder="Quantity"
                    onBlur={onBlur}
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
          <Controller
            control={control}
            render={({ field: { onChange, value, onBlur } }) => (
              <FormControl size="md" isInvalid={!!errors.expiryDate}>
                <FormControlLabel>
                  <FormControlLabelText>Expiry Date</FormControlLabelText>
                </FormControlLabel>
                <DateTimePicker
                  value={value || new Date()}
                  minimumDate={new Date()}
                  onChange={(_e, date) => onChange(date)}
                  onBlur={onBlur}
                />
                <FormControlError>
                  <FormControlErrorText className="text-red-500">
                    {errors.expiryDate?.message}
                  </FormControlErrorText>
                </FormControlError>
              </FormControl>
            )}
            name="expiryDate"
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
