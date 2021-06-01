<?php

namespace moet\controllers;

use Craft;
use craft\web\Controller;
use moet\Module as Moet;

class CellarController extends Controller
{
    public $enableCsrfValidation = false;
        
    public function actionIndex ()
    {
        $currentUser = Craft::$app->getUser()->getIdentity();
        
        return $this->asJson(
            Moet::getInstance()
            ->cellar
            ->fetch($currentUser->id)
        );
    }

    public function actionAdd ()
    {
        $this->requirePostRequest();

        $currentUser = Craft::$app->getUser()->getIdentity();
        
        $request = Craft::$app->getRequest();
        $id = $request->getBodyParam('productId');
        $requestPurchase = $request->getBodyParam('requestPurchase');
        
        return $this->asJson(
            Moet::getInstance()
            ->cellar
            ->add(
                $id,
                $requestPurchase === 'true' ? true : false,
                $currentUser->id
            )
        );
    }

    public function actionDelete ()
    {
        $this->requirePostRequest();

        $currentUser = Craft::$app->getUser()->getIdentity();
        
        $request = Craft::$app->getRequest();
        $id = $request->getBodyParam('itemId');
        
        return $this->asJson(
            Moet::getInstance()
            ->cellar
            ->delete($id, $currentUser->id)
        );
    }

    public function actionRequestPurchase ()
    {
        $this->requirePostRequest();

        $currentUser = Craft::$app->getUser()->getIdentity();
        
        $request = Craft::$app->getRequest();
        $id = $request->getBodyParam('itemId');

        return $this->asJson(
            Moet::getInstance()
            ->cellar
            ->requestPurchase($id, $currentUser->id)
        );        
    }
}
