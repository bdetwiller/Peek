class CreateJoinLists < ActiveRecord::Migration
  def change
    create_table :join_lists do |t|
      t.integer :user_id
      t.integer :list_id

      t.timestamps
    end
  end
end
