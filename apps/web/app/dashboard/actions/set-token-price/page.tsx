"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@workspace/ui/components/input"; // Assuming you're using ShadCN UI library
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/components/form";
import React, { useRef, useState } from "react";
import { PaymentService } from "../../service/PaymentService";
import { LoggerProvider } from "@/logger";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { CHAIN_TYPE, SUPPORTED_CHAIN_ADMIN_ACTIONS } from "@/common/chainIds";
import { CHAIN_DATA, QUERY_KEYS } from "@/common/constants";
import { chainKey } from "@coin98/payment_admin";
import _get from "lodash-es/get";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useToast } from "@workspace/ui/hooks/use-toast";
import Button from "@/components/Button";

// Zod validation schema
const schema = z.object({
  token_address: z.string().min(1, "Token address is required"),
  oracle_address: z.string().min(1, "Oracle address is required"),
  chain: z.string().min(1, "Choose a chain"),
});

type FormData = z.infer<typeof schema>;

const SetTokenPriceForm = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      oracle_address: "",
      token_address: "",
      chain: "",
    },
  });

  const { handleSubmit } = form;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const paymentService = useRef(new PaymentService()).current;
  const queryClient = useQueryClient();
  const navigation = useRouter();
  const toast = useToast();

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      await paymentService.setTokensPrice({
        chain: data.chain as chainKey,
        params: [
          {
            oracleAddress: data.oracle_address,
            tokenAddress: data.token_address,
          },
        ],
      });
      await queryClient.refetchQueries({
        queryKey: [QUERY_KEYS.setTokenPriceTxQuery],
      });
      navigation.push("/dashboard/token-price");
      toast.toast({
        title: "Set token price successfully",
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

  const goBack = () => {
    navigation.back()
  }

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
        className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4"
      >
        {/* Name */}
        <FormField
          name="oracle_address"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block text-sm font-medium text-gray-700">
                Oracle address
              </FormLabel>
              <FormControl>
                <Input {...field} className="mt-1 block w-full" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="token_address"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block text-sm font-medium text-gray-700">
                Token address
              </FormLabel>
              <FormControl>
                <Input {...field} className="mt-1 block w-full" />
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
              <FormLabel>Chain</FormLabel>
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
        {/* Submit Button */}
        <div className="flex gap-x-2 col-span-2">
          <Button
            isLoading={isLoading}
            type="submit"
            className="w-fit py-2 rounded-lg"
          >
            Submit
          </Button>
          <Button
            onClick={goBack}
            variant="secondary"
            type="button"
            className="w-fit py-2 rounded-lg"
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SetTokenPriceForm;
