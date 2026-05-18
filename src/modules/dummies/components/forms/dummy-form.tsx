import type { DummyFormData } from '@/modules/dummies/types';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormInput } from '@/core/components/form-fields/form-input';
import { FormSelect } from '@/core/components/form-fields/form-select';
import { FormSwitch } from '@/core/components/form-fields/form-switch';
import { Button } from '@/core/components/ui/button';
import { FieldGroup } from '@/core/components/ui/field';
import { Spinner } from '@/core/components/ui/spinner';
import { ItemStatus } from '@/core/constants/misc';
import { dummyFormSchema } from '@/modules/dummies/schemas';

export function DummyForm({
  defaultValues,
  onSubmit,
  onCancel,
  isLoading,
  submitLabel,
}: DummyFormProps) {
  const { t } = useTranslation();

  const form = useForm<DummyFormData>({
    resolver: zodResolver(dummyFormSchema),
    defaultValues: {
      key: '',
      name: '',
      count: 0,
      description: '',
      status: ItemStatus.PENDING,
      email: '',
      website: '',
      image: '',
      special: false,
      price: 0,
      ...defaultValues,
    },
  });

  const isSubmitting = form.formState.isSubmitting || isLoading;
  const statusOptions = Object.values(ItemStatus).map((s) => ({
    value: s,
    label: t(`constants.status.${s}`),
  }));

  return (
    <form id="dummy-form" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup className="gap-4">
        <div className="grid grid-cols-2 gap-4">
          <FormInput
            control={form.control}
            name="name"
            label={t('dummies:fields.name')}
            disabled={isSubmitting}
            required
          />
          <FormInput
            control={form.control}
            name="key"
            label={t('dummies:fields.key')}
            disabled={isSubmitting}
            required
          />
        </div>

        <FormInput
          control={form.control}
          name="description"
          label={t('dummies:fields.description')}
          disabled={isSubmitting}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormSelect
            control={form.control}
            name="status"
            label={t('dummies:fields.status')}
            options={statusOptions}
            disabled={isSubmitting}
          />
          <FormInput
            control={form.control}
            name="count"
            label={t('dummies:fields.count')}
            type="number"
            disabled={isSubmitting}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormInput
            control={form.control}
            name="email"
            label={t('dummies:fields.email')}
            type="email"
            disabled={isSubmitting}
            required
          />
          <FormInput
            control={form.control}
            name="price"
            label={t('dummies:fields.price')}
            type="number"
            disabled={isSubmitting}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormInput
            control={form.control}
            name="website"
            label={t('dummies:fields.website')}
            type="url"
            disabled={isSubmitting}
            required
          />
          <FormInput
            control={form.control}
            name="image"
            label={t('dummies:fields.image')}
            type="url"
            disabled={isSubmitting}
            required
          />
        </div>

        <FormSwitch
          control={form.control}
          name="special"
          label={t('dummies:fields.isSpecial')}
          disabled={isSubmitting}
        />

        <div className="flex justify-end gap-2 pt-2">
          {onCancel && (
            <Button
              type="button"
              variant="ghost"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              {t('actions.cancel')}
            </Button>
          )}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Spinner />}
            {submitLabel ?? t('actions.save')}
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
}

export type DummyFormProps = {
  defaultValues?: Partial<DummyFormData>;
  onSubmit: (data: DummyFormData) => void;
  onCancel?: () => void;
  isLoading?: boolean;
  submitLabel?: string;
};
