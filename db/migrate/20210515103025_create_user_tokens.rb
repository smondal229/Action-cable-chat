class CreateUserTokens < ActiveRecord::Migration[5.2]
  def change
    create_table :user_tokens do |t|
      t.string :access_token
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
