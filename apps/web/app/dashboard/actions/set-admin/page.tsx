"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@workspace/ui/components/input"; // Assuming you're using ShadCN UI library
import { Checkbox } from "@workspace/ui/components/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { Button } from "@workspace/ui/components/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/components/form";
import { CHAIN_TYPE, SUPPORTED_CHAIN_ADMIN_ACTIONS } from "@/common/chainIds";
import { CHAIN_DATA, QUERY_KEYS } from "@/common/constants";
import _get from "lodash-es/get";
import React, { useRef, useState } from "react";
import { PaymentService } from "../../service/PaymentService";
import { chainKey } from "@coin98/payment_admin";
import { LoggerProvider } from "@/logger";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@workspace/ui/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

// Zod validation schema
const schema = z.object({
  address: z.string().min(1, "Admin address is required"),
  chain: z.string().min(1, "Choose a chain"),
  is_active: z.boolean().refine((val) => val === true, {
    message: "You must keep it active",
  }),
});

type FormData = z.infer<typeof schema>;

const AdminForm = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      chain: "",
      is_active: false,
      address: "",
    },
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const paymentService = useRef(new PaymentService()).current;
  const navigation = useRouter();
  const toast = useToast();
  const queryClient = useQueryClient();

  const { handleSubmit } = form;

  const onGetBack = () => {
    navigation.back();
  };

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      await paymentService.setAdmins({
        addresses: [data.address],
        chain: data.chain as chainKey,
        isActives: [data.is_active],
      });
      await queryClient.refetchQueries({
        queryKey: [QUERY_KEYS.setAdminTxQuery],
      });
      navigation.push("/dashboard/admin");
      toast.toast({
        title: "Set admin successfully",
      });
    } catch (error) {
      LoggerProvider.log("Submit data error: " + error);
      toast.toast({
        title: "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const chainDataSelection = React.useMemo(
    () =>
      Object.keys(CHAIN_TYPE)
        .map((item) => {
          const isChainDataAvail = [
            !_get(CHAIN_DATA, [item, "isOther"]),
            _get(CHAIN_DATA, item),
            SUPPORTED_CHAIN_ADMIN_ACTIONS.includes(item as chainKey),
          ].every((item) => !!item);
          if (isChainDataAvail) {
            const chainLabel = _get(CHAIN_DATA, [item, "name"], item);
            return (
              <SelectItem key={item} value={item}>
                {chainLabel}
              </SelectItem>
            );
          }
          return null;
        })
        .filter((item) => !!item),
    []
  );

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-4 grid gap-4 lg:grid-cols-2 grid-cols-1 [&_>_*]:flex [&_>_*]:flex-col [&_>_*]:justify-center w-full lg:w-4/5"
      >
        {/* Name */}
        <FormField
          name="address"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">
                Address
              </FormLabel>
              <FormControl>
                <Input {...field} className="block w-full" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="chain"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-70">
                Chain
              </FormLabel>
              <Select onValueChange={field.onChange}>
                <SelectTrigger id="role" className="text-left">
                  <SelectValue placeholder="Which chain?" />
                </SelectTrigger>
                <SelectContent>{chainDataSelection}</SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="is_active"
          control={form.control}
          render={({ field }) => (
            <FormItem className="col-span-1 lg:col-span-2">
              <FormLabel>Status</FormLabel>
              <div className="flex items-center">
                <FormControl>
                  <Checkbox
                    // name={field.name}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="w-5 h-5 text-blue-600"
                  />
                </FormControl>
                <FormLabel className="text-sm !mt-0 ml-2">Active</FormLabel>
              </div>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <div className="mt-4 flex gap-x-2 !flex-row !justify-start">
          <Button type="submit" className="py-2 w-fit text-white rounded-lg">
            {!isLoading ? "Submit" : <Loader2 className="animate-spin" />}
          </Button>
          <Button
            variant="secondary"
            type="button"
            className="w-fit py-2"
            onClick={onGetBack}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AdminForm;
