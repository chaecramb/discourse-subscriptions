# frozen_string_literal: true

module DiscoursePatrons
  class PlansController < ::Admin::AdminController
    include DiscoursePatrons::Stripe

    before_action :set_api_key

    def index
      plans = ::Stripe::Plan.list
      render json: plans.data
    end

    def create
      plan = ::Stripe::Plan.create(
        amount: params[:amount],
        interval: params[:interval],
        product: {
          name: 'Gold special',
        },
        currency: SiteSetting.discourse_patrons_currency,
        id: 'gold-special',
      )

      render json: plan
    end

    def destroy
      plan = ::Stripe::Plan.delete(params[:id])
      render json: plan
    end
  end
end
