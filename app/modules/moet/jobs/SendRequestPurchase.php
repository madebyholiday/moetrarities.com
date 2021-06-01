<?php

namespace moet\jobs;

use Craft;
use craft\elements\User;
use craft\elements\Entry;

class SendRequestPurchase extends \craft\queue\BaseJob
{
    public $productId;
    public $userId;
    
    public function execute($queue)
    {
        $user = User::find()
            ->with(['privateClientManager'])
            ->id($this->userId)
            ->one();

        $product = Entry::find()
            ->section('products')
            ->id($this->productId)
            ->one();

        $pcm = $user->privateClientManager[0];

        return Craft::$app
            ->getMailer()
            ->compose()
            ->setTo($pcm->email)
            ->setSubject('Private Client Purchase Request')
            ->setReplyTo($user->email)
            ->setHtmlBody(
                '<b>Request Info</b><br /><br />' .
                'Name: ' . $user->firstName . ' ' . $user->lastName . '<br />' .
                'Email: ' . $user->email . '<br />' .
                'Phone: ' . $user->phone . '<br />' .
                'Product: <a href="' . $product->url . '">' . $product->title . '</a><br />'
            )
            ->send();
    }

    protected function defaultDescription()
    {
        return 'Sending request purchase';
    }
}
