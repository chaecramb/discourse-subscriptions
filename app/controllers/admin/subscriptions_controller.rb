# frozen_string_literal: true

module DiscoursePatrons
  module Admin
    class SubscriptionsController < ::Admin::AdminController
      include DiscoursePatrons::Stripe

      before_action :set_api_key

      def index
        subscriptions = ::Stripe::Subscription.list
        render_json_dump subscriptions
      end
    end
  end
end
