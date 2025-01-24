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
import { LoggerProvider } from "@/logger";
import { PaymentService } from "../../service/PaymentService";
import { chainKey } from "@coin98/payment_admin";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useToast } from "@workspace/ui/hooks/use-toast";

// Zod validation schema
const schema = z.object({
  partner_code: z.string().min(1, "Partner code is required"),
  token_address: z.string().min(1, "Token address is required"),
  is_active: z.boolean().refine((val) => val === true, {
    message: "You must keep it active",
  }),
  chain: z.string().min(1, "Choose a chain"),
  price_in_token: z
    .string()
    .refine(
      (value) => !isNaN(Number(value)) && Number(value) >= 0,
      "Price in token is required"
    ),
  price_in_usd: z
    .string()
    .refine(
      (value) => !isNaN(Number(value)) && Number(value) >= 0,
      "Price in use is required"
    ),
});

type FormData = z.infer<typeof schema>;

const TokenForm = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      chain: CHAIN_TYPE.tomo,
      is_active: false,
      partner_code: "",
      price_in_token: "0",
      price_in_usd: "0",
      token_address: "",
    },
  });
  const [isLoading, setIsLoading] = useState<boolean>();
  const paymentService = useRef(new PaymentService()).current;
  const queryClient = useQueryClient();
  const navigation = useRouter();
  const toast = useToast();

  const { handleSubmit } = form;

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      await paymentService.addItems({
        params: [
          {
            itemInfo: {
              isActive: data.is_active,
              partnerCode: data.partner_code,
              priceInToken: data.price_in_token,
              tokenAddress: data.token_address,
              priceInUsd: data.price_in_usd,
            },
          },
        ],
        chain: data.chain as chainKey,
      });
      await queryClient.refetchQueries({
        queryKey: [QUERY_KEYS.addTokenTxQuery],
      });
      navigation.push("/dashboard/token");
      toast.toast({
        title: "Add token successfully",
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
          name="partner_code"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block text-sm font-medium text-gray-700">
                Partner code
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
          name="price_in_token"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block text-sm font-medium text-gray-700">
                Price in token
              </FormLabel>
              <FormControl>
                <Input {...field} className="mt-1 block w-full" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="price_in_usd"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block text-sm font-medium text-gray-700">
                Price in usd
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

        <FormField
          name="is_active"
          control={form.control}
          render={({ field }) => (
            <FormItem>
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
        <div className="flex gap-2 mt-4">
          <Button type="submit" className="w-fit py-2">
            Submit
          </Button>
          <Button onClick={goBack} variant="secondary" type="button" className="w-fit py-2">
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default TokenForm;
