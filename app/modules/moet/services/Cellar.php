<?php

namespace moet\services;

use yii\base\Component;

use moet\models\CellarItem;

class Cellar extends Component
{
    public function fetch ( $userId )
    {
        return CellarItem::find()
            ->where(['user_id' => $userId])
            ->all();
    }

    public function add ( $productId, $requestPurchase=false, $userId )
    {
        $item = new CellarItem();
        $item->user_id = $userId;
        $item->product_id = $productId;
        $item->request_purchase = $requestPurchase;
        
        try {
            return $item->save();
        } catch ( \yii\db\IntegrityException $error ) {
            return $error;
        }
    }

    public function delete ( $itemId, $userId )
    {
        $item = CellarItem::find()
            ->where([
              'id' => $itemId,
              'user_id' => $userId
            ])->one();
        
        if ( $item && $item->delete() > 0) {
            return true;
        } else {
            return false;
        }
    }

    public function requestPurchase ( $productId, $userId )
    {
        $item = CellarItem::find()
            ->where([
                'product_id' => $productId,
                'user_id' => $userId
            ])->one();

        $item->request_purchase = true;

        return $item->save();
    }
}
