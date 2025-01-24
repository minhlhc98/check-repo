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
import { LoggerProvider } from "@/logger";
import { chainKey } from "@coin98/payment_admin";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@workspace/ui/hooks/use-toast";

// Zod validation schema
const schema = z.object({
  partner_code: z.string().min(1, "Partner code is required"),
  owner: z.string().min(1, "Owner address is required"),
  fee_receiver: z.string().min(1, "Fee receiver address is required"),
  is_active: z.boolean().refine((val) => val === true, {
    message: "You must keep it active",
  }),
  chain: z.string().min(1, "Choose a chain"),
  commission_fee: z
    .string()
    .refine(
      (value) => !isNaN(Number(value)) && Number(value) >= 0,
      "Commission free must be number"
    ),
  protocol_fee: z
    .string()
    .refine(
      (value) => !isNaN(Number(value)) && Number(value) >= 0,
      "Protocol free must be number"
    ),
});

type FormData = z.infer<typeof schema>;

const PartnerForm = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      chain: CHAIN_TYPE.tomo,
      is_active: false,
      partner_code: "",
      owner: "",
      fee_receiver: "",
      commission_fee: "0",
      protocol_fee: "0",
    },
  });

  const { handleSubmit } = form;
  const queryClient = useQueryClient();
  const navigation = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>();
  const paymentService = useRef(new PaymentService()).current;
  const toast = useToast();

  const onGetBack = () => {
    navigation.back();
  };

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      await paymentService.addPartner({
        chain: data.chain as chainKey,
        partnerCode: data.partner_code,
        partnerInfo: {
          commissionFee: data.commission_fee,
          feeReceiver: data.fee_receiver,
          isActive: data.is_active,
          owner: data.owner,
          protocolFee: data.protocol_fee,
        },
      });
      await queryClient.refetchQueries({
        queryKey: [QUERY_KEYS.addPartnerTxQuery],
      });
      navigation.replace("/dashboard/partner");
      toast.toast({
        title: "Set partner successfully",
      });
    } catch (error) {
      LoggerProvider.log(error);
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
        className="grid grid-cols-1 lg:grid-cols-2  gap-4 p-4 w-full lg:w-4/5"
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
          name="owner"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block text-sm font-medium text-gray-700">
                Owner
              </FormLabel>
              <FormControl>
                <Input {...field} className="mt-1 block w-full" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="fee_receiver"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block text-sm font-medium text-gray-700">
                Fee Receiver
              </FormLabel>
              <FormControl>
                <Input {...field} className="mt-1 block w-full" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="commission_fee"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block text-sm font-medium text-gray-700">
                Commission fee
              </FormLabel>
              <FormControl>
                <Input {...field} className="mt-1 block w-full" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="protocol_fee"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block text-sm font-medium text-gray-700">
                Protocol fee
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
              <FormLabel className="block text-sm font-medium text-gray-700">
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
                    className="w-5 h-5"
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
          <Button type="submit" className="w-fit py-2 text-white">
            Submit
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={onGetBack}
            className="w-fit py-2"
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PartnerForm;
