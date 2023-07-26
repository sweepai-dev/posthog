<?php

namespace PostHog;

class Consumer
{
    public function page($url)
    {
        $this->capture('$pageview', array('$current_url' => $url));
    }
}