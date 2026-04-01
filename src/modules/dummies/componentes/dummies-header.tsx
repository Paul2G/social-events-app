// modules/dummies/components/dummies-header.tsx
import { useState } from 'react';
import { PlusIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/core/components/ui/button';
import { Typography } from '@/core/components/ui/typography';
import { CreateDummyDialog } from '@/modules/dummies/componentes/dialogs/create-dummy-dialog';

export function DummiesHeader() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <div className="flex justify-between">
      <Typography variant="h1">{t('layout:navItems.dummies')}</Typography>
      <div className="flex gap-2">
        <Button onClick={() => setOpen(true)}>
          <PlusIcon />
          {t('dummies:actions.addNew')}
        </Button>
      </div>

      <CreateDummyDialog open={open} onOpenChange={setOpen} />
    </div>
  );
}
